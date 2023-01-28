import { Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";

const ErrorPage: React.FC<{ errorMsg: string }> = (props) => {
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
      {props?.errorMsg && (
        <h1 style={{ textAlign: "center" }}>props.errorMsg</h1>
      )}
      {!props?.errorMsg && (
        <h1 style={{ textAlign: "center" }}>
          <FormattedMessage
            id="404_ERROR"
            defaultMessage="Whoops. Something didn't work."
          ></FormattedMessage>
        </h1>
      )}
    </Paper>
  );
}; // @TODO improve upon this

export default ErrorPage;
