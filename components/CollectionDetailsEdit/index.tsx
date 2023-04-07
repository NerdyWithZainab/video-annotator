import React, { useEffect, useState } from "react";
import InfoIcon from "../InfoIcon";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";

import InfoPanel from "../InfoPanel";
import { Collection } from "../../types";
import { isValidName } from "../../utilities/validators";
import CustomError from "../Error";

const CollectionDetailsEdit: React.FC<{
  collection: Collection;
  setIsCollectionDetailsInEditMode: (val: boolean) => void;
}> = ({ collection, setIsCollectionDetailsInEditMode }) => {
  const intl: IntlShape = useIntl();

  useEffect(() => {
    setName(collection?.name);
    setNameOfVideo(collection?.nameOfVideo);
    setNameOfEvent(collection?.nameOfEvent);
    setIsPrivate(collection?.isPrivate);
  }, [collection]);

  const [error, setError] = useState<string>("");
  const [allRequiredValid, setAllRequiredValid] = useState<boolean>(false);
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
  const handleIsPrivateChange: (event: any) => void = (event: any) => {
    const currentIsPrivate: any = event?.target?.checked;
    setIsPrivate(currentIsPrivate);
  };

  useEffect(() => {
    if (
      isValidName(name) &&
      isValidName(nameOfEvent) &&
      isValidName(nameOfVideo)
    ) {
      setAllRequiredValid(true);
    } else {
      setAllRequiredValid(false);
    }
  }, [name, nameOfEvent, nameOfVideo]);

  const handleCollectionDetailsSubmission: () => void = async () => {
    try {
      // TODO@ add this to the database
      // currentIsPrivate
      // name
      // nameOfVideo
      // nameOfEvent
      setIsCollectionDetailsInEditMode(false);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const isPrivateCollectionLabel: string = intl.formatMessage({
    id: "IS_COLLECTION_PRIVATE",
    defaultMessage: "Is the collection private?",
  });

  return (
    <InfoPanel
      titleId="COLLECTION_DETAILS_EDIT"
      titleDefault="Edit Collection Details"
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              style={{ marginRight: 10 }}
              control={<Checkbox />}
              value={isPrivate}
              onChange={handleIsPrivateChange}
              label={isPrivateCollectionLabel}
            />
            <InfoIcon
              messageId="IS_PRIVATE_DESCRIPTION"
              defaultMessage="If selected, other users will be able to access, read, and edit the videos within the collection as their privileges permit. They will not be able to edit the questions that appear during video intake."
            />
          </div>
        </Grid>
        <Grid item lg={12} sm={12}>
          <Button
            style={{ marginBottom: 10 }}
            data-testid={"collection-details-submit-button"}
            variant="contained"
            disabled={!allRequiredValid}
            onClick={handleCollectionDetailsSubmission}
          >
            <FormattedMessage id="DONE" defaultMessage="Done" />
          </Button>
          {error && <CustomError errorMsg={error} />}
        </Grid>
      </Grid>
    </InfoPanel>
  );
};

export default CollectionDetailsEdit;
