import React from "react";
import {
  Button,
  Fab,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Tooltip } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { FormattedMessage } from "react-intl";

const InfoPanel: React.FC<{
  titleId: string;
  titleDefault: string;
  styleOverrides?: {};
  textOverrides?: {};
  includeCornerEditButton?: boolean;
  setEditButton?: (val: boolean) => void;
  children?: React.ReactNode;
}> = ({
  titleId,
  titleDefault,
  styleOverrides = {},
  textOverrides = {},
  includeCornerEditButton = false,
  setEditButton = () => {},
  children,
}) => {
  // console.log("deleteMe includeCornerEditButton is: ");
  // console.log(includeCornerEditButton);
  const isEditable: boolean = includeCornerEditButton && Boolean(setEditButton);

  const handleEditClick: () => void = () => {
    setEditButton(true);
  };

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
        {isEditable && (
          <Grid container justifyContent="flex-end" alignItems="flex-end">
            <Grid item>
              {/* <IconButton
                color="primary"
                aria-label="edit collection"
                onClick={handleEditClick}
              > */}
              <Fab
                color="primary"
                aria-label="edit collection"
                onClick={handleEditClick}
              >
                <EditRoundedIcon />
              </Fab>
              {/* </IconButton> */}
            </Grid>
          </Grid>
        )}
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
