import { Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

const InfoPanelBody: React.FC<{
  bodyId?: string;
  bodyDefault?: string;
  styleOverrides?: {};
  children?: React.ReactNode;
}> = ({ bodyId, bodyDefault, styleOverrides = {}, children }) => {
  return (
    <Typography
      variant="body1"
      style={{ marginBottom: "1vh", ...styleOverrides }}
    >
      {bodyId && <FormattedMessage id={bodyId} defaultMessage={bodyDefault} />}
      {children}
    </Typography>
  );
};

export default InfoPanelBody;
