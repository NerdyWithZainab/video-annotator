import React, { Fragment, ReactFragment, useState } from "react";
import { TextField } from "@mui/material";
import { Paper } from "@mui/material";

import { isValidEmail, isValidPassword } from "../../utilities/validators";

const CreateAccount: React.FC = () => {
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userNameInvalid, setUserNameInvalid] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = event.currentTarget.value;
    setEmail(email);
    setEmailInvalid(!isValidEmail(email));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = event.currentTarget.value;
    setPassword(password);
    setPasswordInvalid(!isValidPassword(password));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword: string = event.currentTarget.value;
    setConfirmPassword(confirmPassword);
    setConfirmPasswordInvalid(confirmPassword !== password);
  };

  return (
    <Paper
      elevation={8}
      style={{
        marginTop: "10vh",
        paddingBottom: "10vh",
        paddingTop: "3vh",
        paddingLeft: "3vw",
        paddingRight: "3vw",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Create an Account</h1>
      <TextField
        data-testid={"emailInput"}
        error={emailInvalid}
        variant="filled"
        label="Email Address"
        required
        fullWidth
        helperText={emailInvalid ? "Must be a valid email address" : ""}
        style={{ marginBottom: 10, width: "60vw" }}
        onChange={handleEmailChange}
      ></TextField>
      <TextField
        data-testid={"passwordInput"}
        error={passwordInvalid}
        variant="filled"
        label="Password"
        required
        fullWidth
        helperText={
          passwordInvalid
            ? "Password must be seven characters long and contain both letters and numbers"
            : ""
        }
        onChange={handlePasswordChange}
        style={{ marginBottom: 10, width: "40vw" }}
      ></TextField>
      <TextField
        data-testid={"confirmPasswordInput"}
        error={confirmPasswordInvalid}
        variant="filled"
        label="Confirm Password"
        required
        fullWidth
        helperText={confirmPasswordInvalid ? "Passwords must be identical" : ""}
        style={{ marginBottom: 10, maxWidth: "40vw" }}
        onChange={handleConfirmPasswordChange}
      ></TextField>
      <TextField
        error={userNameInvalid}
        variant="filled"
        label="Username"
        required
        fullWidth
        helperText={
          userNameInvalid ? "Username already exists; try another username" : ""
        }
        style={{ marginBottom: 10, maxWidth: "40vw" }}
      ></TextField>
    </Paper>
  );
};

export default CreateAccount;
