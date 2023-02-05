import React, { useEffect, useState } from "react";

import { Paper, TextField, Button } from "@mui/material";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InputAdornment from "@mui/material/InputAdornment";

import { isValidEmail } from "../../utilities/validators";
import CustomError from "../../components/Error/index";
import { setUserProperties } from "firebase/analytics";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const Login: React.FC = () => {
  const intl: IntlShape = useIntl();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [allRequiredValid, setAllRequiredValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [passwordFieldType, setPasswordFieldType] =
    useState<string>("password");

  const {
    authUser,
    loading: firebaseLoading,
    login,
    createUserWithEmailAndPassword,
    signOut,
  } = useFirebaseAuth();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail: string = event?.currentTarget?.value;
    setEmail(currentEmail);
    setEmailInvalid(!isValidEmail(currentEmail));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword: string = event?.currentTarget?.value;
    setPassword(currentPassword);
  };

  const handleLogin = async () => {
    console.log(
      "deleteMe handleLogin entered. Email is: " +
        email +
        " and password is: " +
        password
    );
    try {
      // signOut(); // @TODO delete this
      console.log("deleteMe got here a1 and authUser is: ");
      console.log(authUser);
      if (!authUser) {
        console.log("deleteMe got here a2 authUser before login is: ");
        console.log(authUser);
        // const signedIn = await login(email, password);
        login(email, password).then((res) => {
          console.log("deleteMe got here d1 and res is: ");
          console.log(res);
        });
        // console.log("deleteMe signedIn is: ");
        // console.log(signedIn);
        console.log("deleteMe authUser after login is: ");
        console.log(authUser);
      }
    } catch (error: any) {
      console.log("deleteMe got here a2");
      setError(error?.message);
    }
  };

  const handlePasswordVisibility = () => {
    if (passwordFieldType === "password") {
      setPasswordFieldType("text");
    } else {
      setPasswordFieldType("password");
    }
  };

  useEffect(() => {
    if (isValidEmail(email)) {
      setAllRequiredValid(true);
    } else {
      setAllRequiredValid(false);
    }
  }, [emailInvalid, email, password]);

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
        <FormattedMessage id="LOGIN" defaultMessage="Login" />
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
          variant="filled"
          label={<FormattedMessage id="PASSWORD" defaultMessage="Password" />}
          required
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
      <Button
        data-testid={"submit-button"}
        variant="contained"
        disabled={!allRequiredValid}
        onClick={handleLogin}
      >
        <FormattedMessage id="LOGIN" defaultMessage="Login" />
      </Button>
      {error && <CustomError errorMsg={error} />}
    </Paper>
  );
};

export default Login;
