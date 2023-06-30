import { Grid } from "@mui/material";
import { get, map } from "lodash-es";
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
        {map(collection?.videoIntakeQuestions, (intakeQuestion) => {
          return (
            <Grid item lg={12} sm={12} key={intakeQuestion?.label}>
              <SingleFormField
                question={intakeQuestion}
                formFieldGroup={formFieldGroup}
                key={intakeQuestion?.label}
              />
            </Grid>
          );
        })}
        {collection?.videoQuestionsFormFieldGroup && (
          <Grid item lg={12} sm={12}>
            <ComposedFormSubmissionButton
              questions={collection?.videoIntakeQuestions || []}
              formFieldGroup={collection?.videoQuestionsFormFieldGroup}
            />
          </Grid>
        )}
      </Grid>
    </InfoPanel>
  );
};
export default VideoIntakePreview;
