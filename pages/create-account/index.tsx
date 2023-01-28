import React, { Fragment, ReactFragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

// TODO delete this after you are satisfied that the wrapper thing is not the way to go
// import { wrapper } from "../../firebase";

import { TextField } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { Paper } from "@mui/material";
import { AuthContext } from "../../contexts/authContext";
import { Button } from "@mui/material";
import { useContext } from "react";

import CustomError from "../../components/Error/index";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utilities/validators";

const CreateAccount: React.FC = () => {
  const intl = useIntl(); // @TODO what type is this??
  const router = useRouter(); // @TODO what type is this??

  const { auth, loading } = useContext(AuthContext);
  console.log("deleteMe auth is currently: ");
  console.log(auth);
  console.log("deleteMe loading is currently: ");
  console.log(loading);
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
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

  const handleAccountCreation = async () => {
    try {
      if (auth) {
        const userInfo: UserCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // const userToken: string | null =
        //   (await userInfo?.user?.getIdToken()) || null;
        // if (userToken) {
        //   //  && auth.currentUser
        //   // const verificationEmailSender = await sendEmailVerification(
        //   //   auth.currentUser
        //   // );
        //   // console.log("deleteMe verificationEmailSender info is: ");
        //   // console.log(verificationEmailSender);
        //   router.push("email-verification");
        // } else {
        //   router.push("error");
        // }
      } else {
        router.push("error");
      }
    } catch (error: any) {
      console.log("deleteMe error is: ");
      console.log(error?.message);
      setError(error?.message);
      // return <CustomError errorMsg={error?.message} />;
      // router.push("error");
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
        ></TextField>
      </div>
      <div>
        <TextField
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
      {error && <CustomError errorMsg={error} />}
    </Paper>
  );
};

export default CreateAccount;
