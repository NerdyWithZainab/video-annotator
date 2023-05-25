import { Grid } from "@mui/material";
import { get, map } from "lodash-es";
import { useEffect } from "react";
// import { shamCollection } from "../../dummy_data/dummyCollection";
import { Collection, FormFieldGroup } from "../../types";
import ComposedFormSubmissionButton from "../ComposedFormSubmissionButton";
import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import SingleFormField from "../SingleFormField";

const VideoIntakePreview: React.FC<{
  collection: Collection;
}> = ({ collection }) => {
  const formFieldGroup: FormFieldGroup | undefined = get(
    collection,
    "formFieldGroup"
  );

  return (
    <InfoPanel
      titleId="VIDEO_INTAKE_PREVIEW"
      titleDefault="Video Intake Preview"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
    >
      <InfoPanelBody
        bodyId="INTAKE_PREVIEW_DETAILS"
        bodyDefault="Contributors to your collection will see the following questions when they submit new videos to the collection: "
      />
      <Grid container>
        {map(collection?.intakeQuestions, (intakeQuestion) => {
          return (
            <Grid item lg={12} sm={12}>
              <SingleFormField
                question={intakeQuestion}
                formFieldGroup={formFieldGroup}
                key={intakeQuestion?.label}
              />
            </Grid>
          );
        })}
        {collection?.formFieldGroup && (
          <Grid item lg={12} sm={12}>
            <ComposedFormSubmissionButton
              questions={collection?.intakeQuestions || []}
              formFieldGroup={collection?.formFieldGroup} // @TODO maybe change this from sham to whatever the passed-in collection is? Think about this and test it before you do it.
            />
          </Grid>
        )}
      </Grid>
    </InfoPanel>
  );
};
export default VideoIntakePreview;
