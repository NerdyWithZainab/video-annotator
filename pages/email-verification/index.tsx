import { Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";

const EmailVerification: React.FC = () => {
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
        ></FormattedMessage>
      </h1>
    </Paper>
  );
};

export default EmailVerification;
