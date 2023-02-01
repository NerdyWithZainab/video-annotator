import React from "react";
import { Paper, Alert } from "@mui/material";
import { FormattedMessage } from "react-intl";

const CustomError: React.FC<{ errorMsg?: string }> = (props) => {
  // console.log("deleteMe got here and props are: ");
  // console.log(props);
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
        <React.Fragment>
          <h1>
            <FormattedMessage
              id="404_ERROR"
              defaultMessage="Whoops. Something didn't work."
            ></FormattedMessage>
          </h1>
          <Alert severity="error" style={{ textAlign: "center" }}>
            {props.errorMsg}
          </Alert>
        </React.Fragment>
      )}
      {!props?.errorMsg && (
        <Alert style={{ textAlign: "center" }}>
          <FormattedMessage
            id="404_ERROR"
            defaultMessage="Whoops. Something didn't work."
          ></FormattedMessage>
        </Alert>
      )}
    </Paper>
  );
}; // @TODO improve upon this

export default CustomError;
