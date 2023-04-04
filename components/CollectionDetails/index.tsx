import React, { useEffect, useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Avatar, Tooltip } from "@mui/material";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import { isBoolean } from "lodash-es";

import InfoPanel from "../InfoPanel";
import { Collection } from "../../types";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import { isValidName } from "../../utilities/validators";

const CollectionDetails: React.FC<{
  collection: Collection;
}> = ({ collection }) => {
  const intl: IntlShape = useIntl();

  useEffect(() => {
    setName(collection?.name);
    setNameOfVideo(collection?.nameOfVideo);
    setNameOfEvent(collection?.nameOfEvent);
    setIsPrivate(collection?.isPrivate);
  }, [collection]);

  const [name, setName] = useState<string>("");
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const handleNameChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentName: string = event?.currentTarget?.value;
    setName(currentName);
    setNameInvalid(!isValidName(currentName));
  };

  const [nameOfVideo, setNameOfVideo] = useState<string>("");
  const [nameOfVideoInvalid, setNameOfVideoInvalid] = useState<boolean>(false);
  const handleNameOfVideoChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentNameOfVideo: string = event?.currentTarget?.value;
    setNameOfVideo(currentNameOfVideo);
    setNameOfVideoInvalid(!isValidName(currentNameOfVideo));
  };

  const [nameOfEvent, setNameOfEvent] = useState<string>("");
  const [nameOfEventInvalid, setnameOfEventInvalid] = useState<boolean>(false);
  const handleNameOfEventChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentNameOfEvent: string = event?.currentTarget?.value;
    setNameOfEvent(currentNameOfEvent);
    setnameOfEventInvalid(!isValidName(currentNameOfEvent));
  };

  const [isPrivate, setIsPrivate] = useState<boolean>(); // default to public
  //   const [isPrivateInvalid, setIsPrivateInvalid] = useState<boolean>(false);
  const handleIsPrivateChange: (event: any) => void = (event: any) => {
    const currentIsPrivate: any = event?.target?.checked;
    console.log("deleteMe currentIsPrivate is: ");
    console.log(currentIsPrivate);
    setIsPrivate(currentIsPrivate);
    // setIsPrivateInvalid(!isBoolean(currentIsPrivate));
  };

  const isPrivateCollectionLabel: string = intl.formatMessage({
    id: "IS_COLLECTION_PRIVATE",
    defaultMessage: "Is the collection private?",
  });

  return (
    <InfoPanel
      titleId="COLLECTION_DETAILS"
      titleDefault="Collection Details"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
    >
      <Grid container>
        <Grid item lg={12} sm={12}>
          <TextField
            fullWidth
            data-testid={"collection-name"}
            error={nameInvalid}
            variant="filled"
            label={
              <FormattedMessage
                id="COLLECTION_NAME"
                defaultMessage="Collection Name"
              />
            }
            required
            helperText={
              nameInvalid
                ? intl.formatMessage({
                    id: "COLLECTION_NAME_CANNOT_BE_BLANK",
                    defaultMessage: "Collection name cannot be blank",
                  })
                : ""
            }
            style={{ marginBottom: 10, maxWidth: 400 }}
            onChange={handleNameChange}
            value={name}
          ></TextField>
        </Grid>
        <Grid item lg={12} sm={12}>
          <TextField
            fullWidth
            data-testid={"collection-name-of-video"}
            error={nameOfVideoInvalid}
            variant="filled"
            label={
              <FormattedMessage
                id="NAME_OF_VIDEO"
                defaultMessage="Name of video"
              />
            }
            required
            helperText={
              nameOfVideoInvalid
                ? intl.formatMessage(
                    {
                      id: "GENERIC_CANNOT_BE_BLANK",
                      defaultMessage: "Name of video cannot be blank",
                    },
                    { name: "Name of video" } // @TODO internationalize this, too
                  )
                : ""
            }
            style={{ marginBottom: 10, maxWidth: 400 }}
            onChange={handleNameOfVideoChange}
            value={nameOfVideo}
          ></TextField>
        </Grid>
        <Grid item lg={12} sm={12}>
          <TextField
            fullWidth
            error={nameOfEventInvalid}
            variant="filled"
            data-testid={"collection-name-of-event"}
            label={
              <FormattedMessage
                id="NAME_OF_EVENT"
                defaultMessage="Name of event"
              />
            }
            required
            helperText={
              nameOfEventInvalid
                ? intl.formatMessage(
                    {
                      id: "GENERIC_CANNOT_BE_BLANK",
                      defaultMessage: "Name of event cannot be blank",
                    },
                    { name: "Name of event" } // @TODO internationalize this, too
                  )
                : ""
            }
            style={{ marginBottom: 10, maxWidth: 400 }}
            onChange={handleNameOfEventChange}
            value={nameOfEvent}
          ></TextField>
        </Grid>
        <Grid item lg={12} sm={12}>
          <FormControlLabel
            control={<Checkbox />}
            value={isPrivate}
            onChange={handleIsPrivateChange}
            label={isPrivateCollectionLabel}
          />
          <Tooltip
            title={intl.formatMessage({
              id: "IS_PRIVATE_DESCRIPTION",
              defaultMessage:
                "If selected, other users will be able to access, read, and edit the videos within the collection as their privileges permit. They will not be able to edit the questions that appear during video intake.",
            })}
          >
            <Avatar
              style={{
                border: "1px solid black",
                height: 25,
                width: 25,
                paddingRight: 0,
                marginRight: 0,
              }}
            >
              <QuestionMarkIcon />
            </Avatar>
          </Tooltip>
        </Grid>
      </Grid>
    </InfoPanel>
  );
};

export default CollectionDetails;
