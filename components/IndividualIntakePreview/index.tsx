import { Grid } from "@mui/material";
import { get, map } from "lodash-es";
import { Collection, FormFieldGroup } from "../../types";
import ComposedFormSubmissionButton from "../ComposedFormSubmissionButton";
import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import SingleFormField from "../SingleFormField";

const IndividualIntakePreview: React.FC<{
  collection: Collection;
}> = ({ collection }) => {
  const formFieldGroup: FormFieldGroup | undefined = get(
    collection,
    "individualQuestionsFormFieldGroup"
  );

  return (
    <InfoPanel
      titleId="INDIVIDUAL_INTAKE_PREVIEW"
      titleDefault="Individual Intake Preview"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
    >
      <InfoPanelBody
        bodyId="INDIVIDUAL_INTAKE_PREVIEW_DETAILS"
        bodyDefault="Contributors to your collection will see the following questions when they create or edit new individuals in the collection: "
      />
      <Grid container>
        {map(
          collection?.individualIntakeQuestions,
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
        {collection?.individualQuestionsFormFieldGroup && (
          <Grid item lg={12} sm={12}>
            <ComposedFormSubmissionButton
              questions={collection?.individualIntakeQuestions || []}
              formFieldGroup={collection?.individualQuestionsFormFieldGroup}
            />
          </Grid>
        )}
      </Grid>
    </InfoPanel>
  );
};
export default IndividualIntakePreview;
