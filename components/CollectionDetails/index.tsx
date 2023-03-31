import InfoPanel from "../InfoPanel";
import { Collection } from "../../types";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import { isValidName } from "../../utilities/validators";
import { isBoolean } from "lodash-es";

const CollectionDetails: React.FC<{
  collection: Collection;
}> = ({ collection }) => {
  const intl: IntlShape = useIntl();

  const [name, setName] = useState<string>(collection?.name);
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const handleNameChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentName: string = event?.currentTarget?.value;
    setName(currentName);
    setNameInvalid(!isValidName(currentName));
  };

  const [nameOfVideo, setNameOfVideo] = useState<string>(
    collection?.nameOfVideo || ""
  );
  const [nameOfVideoInvalid, setNameOfVideoInvalid] = useState<boolean>(false);
  const handleNameOfVideoChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentNameOfVideo: string = event?.currentTarget?.value;
    setNameOfVideo(currentNameOfVideo);
    setNameOfVideoInvalid(!isValidName(currentNameOfVideo));
  };

  const [nameOfEvent, setNameOfEvent] = useState<string>(
    collection?.nameOfEvent || ""
  );
  const [nameOfEventInvalid, setnameOfEventInvalid] = useState<boolean>(false);
  const handleNameOfEventChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentNameOfEvent: string = event?.currentTarget?.value;
    setNameOfEvent(currentNameOfEvent);
    setnameOfEventInvalid(!isValidName(currentNameOfEvent));
  };

  const [isPrivate, setIsPrivate] = useState<boolean>(
    collection?.isPrivate || false
  ); // default to public
  const [isPrivateInvalid, setIsPrivateInvalid] = useState<boolean>(false);
  const handleIsPrivateChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentIsPrivate: boolean = Boolean(event?.currentTarget?.value);
    setIsPrivate(currentIsPrivate);
    setIsPrivateInvalid(!isBoolean(currentIsPrivate));
  };

  return (
    <InfoPanel
      titleId="COLLECTION_DETAILS"
      titleDefault="Collection Details"
      textOverrides={{ textAlign: "center" }}
    >
      <InfoPanelBody>
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
                      { name: "Name of video" }
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
        </Grid>
      </InfoPanelBody>
    </InfoPanel>
  );
};

export default CollectionDetails;
