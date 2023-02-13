import React from "react";
import { Paper, Alert } from "@mui/material";
import { FormattedMessage } from "react-intl";

const CustomError: React.FC<{ errorMsg?: string | undefined | null }> = (
  props
) => {
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
      <React.Fragment>
        <h1>
          <FormattedMessage
            id="404_ERROR"
            defaultMessage="Whoops. Something didn't work."
          ></FormattedMessage>
        </h1>
        {props?.errorMsg && (
          <Alert severity="error" style={{ textAlign: "center" }}>
            {props.errorMsg}
          </Alert>
        )}
        {!props?.errorMsg && (
          <Alert style={{ textAlign: "center" }} severity="error">
            <FormattedMessage
              id="GENERIC_ERROR"
              defaultMessage="There was an error, but we don't have an error code for it."
            ></FormattedMessage>
          </Alert>
        )}
      </React.Fragment>
    </Paper>
  );
}; // @TODO improve upon this

export default CustomError;
