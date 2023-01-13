import React, { Fragment, ReactFragment, useState } from "react";
import { TextField } from "@mui/material";
import { Paper } from "@mui/material";

import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utilities/validators";

const CreateAccount: React.FC = () => {
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userNameInvalid, setUserNameInvalid] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

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
    console.log("userNameInvalid is now: " + userNameInvalid);
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
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Create an Account</h1>
      <div>
        <TextField
          fullWidth
          data-testid={"emailInput"}
          error={emailInvalid}
          variant="filled"
          label="Email Address"
          required
          helperText={emailInvalid ? "Must be a valid email address" : ""}
          style={{ marginBottom: 10, maxWidth: 500 }}
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
          label="Password"
          required
          helperText={
            passwordInvalid
              ? "Password must be seven characters long and contain both letters and numbers"
              : ""
          }
          onChange={handlePasswordChange}
          style={{ marginBottom: 10, maxWidth: 500 }}
          value={password}
        ></TextField>
      </div>
      <div>
        <TextField
          fullWidth
          data-testid={"confirmPasswordInput"}
          error={confirmPasswordInvalid}
          variant="filled"
          label="Confirm Password"
          required
          helperText={
            confirmPasswordInvalid ? "Passwords must be identical" : ""
          }
          style={{ marginBottom: 10, maxWidth: 500 }}
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
          label="Username"
          required
          helperText={
            userNameInvalid ? "Username is required" : "" // TODO already exists; try another username
          }
          style={{ marginBottom: 10, maxWidth: 500 }}
          onChange={handleUsernameChange}
          value={username}
        ></TextField>
      </div>
    </Paper>
  );
};

export default CreateAccount;
