import React, { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { UserCredential } from "firebase/auth";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InputAdornment from "@mui/material/InputAdornment";
import useOnEnter from "../../hooks/useOnEnter";

import { TextField, Paper, Button } from "@mui/material";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import { sendEmailVerification } from "firebase/auth";

import CustomError from "../../components/Error/index";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utilities/validators";

const CreateAccount: React.FC = () => {
  const intl: IntlShape = useIntl();
  const router: NextRouter = useRouter();

  const { auth, user } = useFirebaseAuth();

  const { createUser, authError } = useFirebaseAuth();
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false); // @TODO all of these useStates probably might could be cleaned up and combined
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userNameInvalid, setUserNameInvalid] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [allRequiredValid, setAllRequiredValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [passwordFieldType, setPasswordFieldType] =
    useState<string>("password");
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState<string>("password");

  useOnEnter(() => {
    if (allRequiredValid) {
      handleAccountCreation();
    }
  });

  useEffect(() => {
    if (
      isValidEmail(email) &&
      isValidPassword(password) &&
      confirmPassword === password &&
      isValidUsername(username)
    ) {
      setAllRequiredValid(true);
    } else {
      setAllRequiredValid(false);
    }
  }, [
    emailInvalid,
    passwordInvalid,
    confirmPasswordInvalid,
    userNameInvalid,
    email,
    password,
    confirmPassword,
    username,
  ]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail: string = event?.currentTarget?.value;
    setEmail(currentEmail);
    setEmailInvalid(!isValidEmail(currentEmail));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword: string = event?.currentTarget?.value;
    setPassword(currentPassword);
    setPasswordInvalid(!isValidPassword(currentPassword));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentConfirmPassword: string = event?.currentTarget?.value;
    setConfirmPassword(currentConfirmPassword);
    setConfirmPasswordInvalid(currentConfirmPassword !== password);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentUsername = event?.currentTarget?.value;
    setUsername(currentUsername);
    setUserNameInvalid(!isValidUsername(currentUsername));
  };

  const handlePasswordVisibility = () => {
    if (passwordFieldType === "password") {
      setPasswordFieldType("text");
    } else {
      setPasswordFieldType("password");
    }
  };

  useEffect(() => {
    // if (user) router.replace("/must-log-out-first"); // @TODO comment back in
  }, [user, router]);

  const handleConfirmPasswordVisibility = () => {
    if (confirmPasswordFieldType === "password") {
      setConfirmPasswordFieldType("text");
    } else {
      setConfirmPasswordFieldType("password");
    }
  };

  const handleAccountCreation = async () => {
    try {
      if (auth) {
        const userInfo: UserCredential = await createUser(
          auth,
          email,
          password
        );
        // console.log("deleteMe userInfo is: ");
        // console.log(userInfo);
        const userToken: string | null =
          (await userInfo?.user?.getIdToken()) || null;
        if (userToken) {
          // @TODO handle the fact that the user gets redirected to the scenario wherein they can't be in account creation without being logged out
          // await sendEmailVerification(user);
          // router.push("email-verification"); // @TODO comment back in
        } else {
          router.push("error");
        }
      } else {
        router.push("error");
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Paper
      elevation={8}
      style={{
        margin: "auto",
        marginTop: "10vh",
        paddingBottom: "10vh",
        paddingTop: "3vh",
        paddingLeft: "3vw",
        paddingRight: "3vw",
        maxWidth: 400,
      }}
    >
      <h1>
        <FormattedMessage
          id="CREATE_AN_ACCOUNT"
          defaultMessage="Create an Account"
        />
      </h1>
      <div>
        <TextField
          fullWidth
          data-testid={"emailInput"}
          error={emailInvalid}
          variant="filled"
          label={
            <FormattedMessage
              id="EMAIL_ADDRESS"
              defaultMessage="Email Address"
            />
          }
          required
          helperText={
            emailInvalid
              ? intl.formatMessage({
                  id: "MUST_BE_VALID_EMAIL",
                  defaultMessage: "Must be a valid email address",
                })
              : ""
          }
          style={{ marginBottom: 10, maxWidth: 400 }}
          onChange={handleEmailChange}
          value={email}
        ></TextField>
      </div>
      <div>
        <TextField
          type={passwordFieldType}
          fullWidth
          data-testid={"passwordInput"}
          error={passwordInvalid}
          variant="filled"
          label={<FormattedMessage id="PASSWORD" defaultMessage="Password" />}
          required
          helperText={
            passwordInvalid
              ? intl.formatMessage({
                  id: "PASSWORD_MUST_CONTAIN",
                  defaultMessage:
                    "Password must be seven characters long and contain both letters and numbers",
                })
              : ""
          }
          onChange={handlePasswordChange}
          style={{ marginBottom: 10, maxWidth: 400 }}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={handlePasswordVisibility}>
                <RemoveRedEyeIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>
      <div>
        <TextField
          type={confirmPasswordFieldType}
          fullWidth
          data-testid={"confirmPasswordInput"}
          error={confirmPasswordInvalid}
          variant="filled"
          label={
            <FormattedMessage
              id="CONFIRM_PASSWORD"
              defaultMessage="Confirm Passsword"
            />
          }
          required
          helperText={
            confirmPasswordInvalid
              ? intl.formatMessage({
                  id: "PASSWORDS_MUST_BE_IDENTICAL",
                  defaultMessage: "Passwords must be identical",
                })
              : ""
          }
          style={{ marginBottom: 10, maxWidth: 400 }}
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={handleConfirmPasswordVisibility}
              >
                <RemoveRedEyeIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </div>
      <div>
        <TextField
          fullWidth
          data-testid={"usernameInput"}
          error={userNameInvalid}
          variant="filled"
          label={<FormattedMessage id="USERNAME" defaultMessage="Username" />}
          required
          helperText={
            userNameInvalid
              ? intl.formatMessage({
                  id: "USERNAME_IS_REQUIRED",
                  defaultMessage: "Username is required",
                })
              : "" // @TODO already exists; try another username
          }
          style={{ marginBottom: 10, maxWidth: 400 }}
          onChange={handleUsernameChange}
          value={username}
        ></TextField>
      </div>
      <Button
        data-testid={"submit-button"}
        variant="contained"
        disabled={!allRequiredValid}
        onClick={handleAccountCreation}
      >
        <FormattedMessage id="CREATE_ACCOUNT" defaultMessage="Create Account" />
      </Button>
      {(error || authError) && <CustomError errorMsg={error || authError} />}
    </Paper>
  );
};

export default CreateAccount;
