import React, { useEffect, useState } from "react";

import { Paper, TextField, Button } from "@mui/material";
import Icon from "@mui/material/Icon";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import InputAdornment from "@mui/material/InputAdornment";

import { isValidEmail } from "../../utilities/validators";
import CustomError from "../../components/Error/index";
import { setUserProperties } from "firebase/analytics";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const Login: React.FC = () => {
  const intl: IntlShape = useIntl(); // @TODO what type is this??
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
    signInWithEmailAndPassword,
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
    try {
      if (authUser) {
        signInWithEmailAndPassword(email, password);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const handlePasswordVisibility = () => {
    console.log("deleteMe clicked!");
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
