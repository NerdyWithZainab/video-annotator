import { Button, Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { getAuth, Auth, User, sendEmailVerification } from "firebase/auth";

const EmailVerification: React.FC = () => {
  const auth: Auth = getAuth();
  const currentUser: User | null = auth.currentUser;
  if (currentUser) {
    // @TODO deleteMe
    console.log("deleteMe currentUser is: ");
    console.log(currentUser);
  }

  const handleVerificationEmailSendoff = async () => {
    if (currentUser) {
      const verificationEmailSender = await sendEmailVerification(currentUser);
      console.log("deleteMe verificationEmailSender info is: ");
      console.log(verificationEmailSender);
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
      <h1 style={{ textAlign: "center" }}>
        <FormattedMessage
          id="VERIFY_EMAIL_ADDRESS"
          defaultMessage="Verify Your Email Address"
        />
      </h1>
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
