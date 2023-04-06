import { Grid, Typography } from "@mui/material";

import { map } from "lodash-es";

import { Collection } from "../../types";
import InfoPanel from "../InfoPanel";
import {
  capitalizeEachWord,
  convertCamelCaseToCapitalCase,
} from "../../utilities/textUtils";

const CollectionDetailsView: React.FC<{
  collection: Collection;
  setIsCollectionDetailsInEditMode: () => {};
}> = ({ collection, setIsCollectionDetailsInEditMode }) => {
  return (
    <InfoPanel
      titleId="COLLECTION_DETAILS"
      titleDefault="Collection Details"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
      includeCornerEditButton={true}
      setEditButton={setIsCollectionDetailsInEditMode}
    >
      <Grid container>
        {map(collection, (collectionEl, elKey) => {
          //   console.log("deleteMe collectionEl is: ");
          //   console.log(capitalizeEachWord(collectionEl.toString()));
          //   console.log("deleteMe elKey is: ");
          //   console.log(convertCamelCaseToCapitalCase(elKey));
          return (
            <Grid item lg={12} sm={12}>
              <Typography>
                {convertCamelCaseToCapitalCase(elKey)} :{" "}
                {capitalizeEachWord(collectionEl.toString())}
              </Typography>
            </Grid>
          );
        })}

        {/* <Grid item lg={12} sm={12}>
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
            <FormattedMessage id="UPDATE" defaultMessage="Update" />
          </Button>
          {error && <CustomError errorMsg={error} />}
        </Grid> */}
      </Grid>
    </InfoPanel>
  );
};

export default CollectionDetailsView;
