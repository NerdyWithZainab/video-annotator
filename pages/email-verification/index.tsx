import { Button, Paper, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { User, sendEmailVerification, Auth, getAuth } from "firebase/auth";

const EmailVerification: React.FC = () => {
  const auth: Auth = getAuth();
  const currentUser: User | null = auth.currentUser;

  const handleVerificationEmailSendoff = async () => {
    if (currentUser) {
      await sendEmailVerification(currentUser);
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
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: 10 }}
      >
        <FormattedMessage
          id="VERIFY_EMAIL_ADDRESS"
          defaultMessage="Verify Your Email Address"
        />
      </Typography>
      <Typography
        variant="body1"
        component="div"
        sx={{ flexGrow: 1 }}
        style={{ marginBottom: 10 }}
      >
        <FormattedMessage id="EMAIL_VERIFICATION_DESCRIPTION" />
      </Typography>
      <Button variant="contained" onClick={handleVerificationEmailSendoff}>
        <FormattedMessage
          id="SEND_VERIFICATION_EMAIL"
          defaultMessage="Send verification email"
        />
      </Button>
    </Paper>
  );
};

export default EmailVerification;
