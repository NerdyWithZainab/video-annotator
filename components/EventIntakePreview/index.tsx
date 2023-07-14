import { Grid } from "@mui/material";
import { get, map } from "lodash-es";
import { Collection, FormFieldGroup } from "../../types";
import ComposedFormSubmissionButton from "../ComposedFormSubmissionButton";
import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import SingleFormField from "../SingleFormField";

const EventIntakePreview: React.FC<{
  collection: Collection;
}> = ({ collection }) => {
  console.log("deleteMe collection is: ");
  console.log(collection);
  const formFieldGroup: FormFieldGroup | undefined = get(
    collection,
    "eventQuestionsFormFieldGroup"
  );
  console.log("deleteMe formFieldGroup in EventIntakePreview is: ");
  console.log(formFieldGroup);

  return (
    <InfoPanel
      titleId="EVENT_INTAKE_PREVIEW"
      titleDefault="Event Intake Preview"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
    >
      <InfoPanelBody
        bodyId="EVENT_INTAKE_PREVIEW_DETAILS"
        bodyDefault="Events are the things that get annotated in videos. Contributors to your collection will see the following questions when they create or edit annotations in the videos contained in the collection."
      />
      <Grid container>
        {map(
          collection?.eventIntakeQuestions,
          (intakeQuestion, intakeQuestionIdx) => {
            return (
              <Grid item lg={12} sm={12} key={intakeQuestion?.label}>
                <SingleFormField
                  key={intakeQuestionIdx}
                  question={intakeQuestion}
                  formFieldGroup={formFieldGroup}
                />
              </Grid>
            );
          }
        )}
        {collection?.eventQuestionsFormFieldGroup && (
          <Grid item lg={12} sm={12}>
            <ComposedFormSubmissionButton
              questions={collection?.eventIntakeQuestions || []}
              formFieldGroup={collection?.eventQuestionsFormFieldGroup}
            />
          </Grid>
        )}
      </Grid>
    </InfoPanel>
  );
};
export default EventIntakePreview;
