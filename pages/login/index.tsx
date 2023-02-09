import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { Paper, TextField, Button, Link } from "@mui/material";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InputAdornment from "@mui/material/InputAdornment";

import { isValidEmail } from "../../utilities/validators";
import CustomError from "../../components/Error/index";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import useOnEnter from "../../hooks/useOnEnter";

const Login: React.FC = () => {
  const router: NextRouter = useRouter();
  const intl: IntlShape = useIntl();
  const [email, setEmail] = useState<string>(""); // @TODO simplify all of these useStates
  const [password, setPassword] = useState<string>("");
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [allRequiredValid, setAllRequiredValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [passwordFieldType, setPasswordFieldType] =
    useState<string>("password");

  const { user, login, authError } = useFirebaseAuth();

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
      if (!user) {
        await login(email, password);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  useOnEnter(() => {
    if (allRequiredValid) {
      handleLogin();
    }
  });
  const handlePasswordVisibility = () => {
    if (passwordFieldType === "password") {
      setPasswordFieldType("text");
    } else {
      setPasswordFieldType("password");
    }
  };

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

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
        style={{ marginBottom: 10 }}
        data-testid={"submit-button"}
        variant="contained"
        disabled={!allRequiredValid}
        onClick={handleLogin}
      >
        <FormattedMessage id="LOGIN" defaultMessage="Login" />
      </Button>
      <div style={{ marginBottom: 10 }}>
        <Link href="/forgot-password">
          <FormattedMessage
            id="FORGOT_PASSWORD"
            defaultMessage="Forgot Password?"
          />
        </Link>
      </div>
      <div>
        <Button variant="contained" href="/create-account">
          <FormattedMessage
            id="CREATE_ACCOUNT"
            defaultMessage="Create Account"
          ></FormattedMessage>
        </Button>
      </div>
      {(error || authError) && (
        <CustomError
          errorMsg={
            error ||
            authError ||
            intl.formatMessage({
              id: "GENERIC_ERROR",
              defaultMessage: "Unknown Error",
            })
          }
        />
      )}
    </Paper>
  );
};

export default Login;
