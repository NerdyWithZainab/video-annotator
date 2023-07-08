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
  // console.log("deleteMe collection in VideoIntakePreview is: ");
  // console.log(collection);
  const formFieldGroup: FormFieldGroup | undefined = get(
    collection,
    "videoQuestionsFormFieldGroup"
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
        {map(
          collection?.videoIntakeQuestions,
          (intakeQuestion, intakeQuestionIdx) => {
            if (intakeQuestion) {
              return (
                <Grid item lg={12} sm={12} key={intakeQuestionIdx}>
                  <SingleFormField
                    question={intakeQuestion}
                    formFieldGroup={formFieldGroup}
                    key={intakeQuestionIdx}
                  />
                </Grid>
              );
            }
          }
        )}
        {collection?.videoQuestionsFormFieldGroup &&
          collection?.videoIntakeQuestions && (
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
