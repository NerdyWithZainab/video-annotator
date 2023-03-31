import { Paper, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

const InfoPanel: React.FC<{
  titleId: string;
  titleDefault: string;
  styleOverrides?: {};
  textOverrides?: {};
  children?: React.ReactNode;
}> = ({
  titleId,
  titleDefault,
  styleOverrides = {},
  textOverrides = {},
  children,
}) => {
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
      <>
        <Typography
          variant="h5"
          style={{ marginBottom: "2vh", ...textOverrides }}
        >
          <FormattedMessage id={titleId} defaultMessage={titleDefault} />
        </Typography>
        <div style={{ maxHeight: 200, overflow: "auto", ...styleOverrides }}>
          {children}
        </div>
      </>
    </Paper>
  );
};

export default InfoPanel;
