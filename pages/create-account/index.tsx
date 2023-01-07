import { Fragment, useState } from "react";
import { TextField } from "@mui/material";
export default function CreateAccount() {
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);

  return (
    <Fragment>
      <h1>Create an Account</h1>
      <TextField
        error={emailInvalid}
        variant="filled"
        label="Email Address"
        required
        fullWidth
        helperText={emailInvalid ? "Must be a valid email address" : ""}
        style={{ marginBottom: 10 }}
      ></TextField>
      <TextField
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
        style={{ marginBottom: 10 }}
      ></TextField>
      <TextField
        error={confirmPasswordInvalid}
        variant="filled"
        label="Password"
        required
        fullWidth
        helperText={confirmPasswordInvalid ? "Passwords must be identical" : ""}
        style={{ marginBottom: 10 }}
      ></TextField>
    </Fragment>
  );
}
