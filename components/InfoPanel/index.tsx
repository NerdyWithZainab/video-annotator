import { Paper, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

const InfoPanel: React.FC<{
  titleId: string;
  titleDefault: string;
  children: React.ReactNode;
}> = ({ titleId, titleDefault, children }) => {
  return (
    <Paper
      elevation={8}
      style={{
        margin: "auto",
        paddingBottom: "3vh",
        paddingTop: "3vh",
        paddingLeft: "3vw",
        paddingRight: "3vw",
      }}
    >
      <Typography variant="h5" style={{ marginBottom: "2vh" }}>
        <FormattedMessage id={titleId} defaultMessage={titleDefault} />
      </Typography>
      {children}
    </Paper>
  );
};

export default InfoPanel;
