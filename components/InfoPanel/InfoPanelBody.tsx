import { Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

const InfoPanelBody: React.FC<{
  bodyId: string;
  bodyDefault: string;
  children: React.ReactNode;
}> = ({ bodyId, bodyDefault, children }) => {
  return (
    <Typography variant="body1" style={{ marginBottom: "1vh" }}>
      <FormattedMessage id={bodyId} defaultMessage={bodyDefault} />
      {children}
    </Typography>
  );
};

export default InfoPanelBody;
