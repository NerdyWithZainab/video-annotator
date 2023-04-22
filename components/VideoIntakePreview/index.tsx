import { Grid } from "@mui/material";
import { get, map } from "lodash-es";
import { shamCollection } from "../../dummy_data/dummyCollection";
import { Collection } from "../../types";
import ComposedFormSubmissionButton from "../ComposedFormSubmissionButton";
import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import SingleFormField from "../SingleFormField";

const VideoIntakePreview: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
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
                formFieldGroup={get(collection, "formFieldGroup", {})}
                key={intakeQuestion?.label}
              />
            </Grid>
          );
        })}
        <Grid item lg={12} sm={12}>
          <ComposedFormSubmissionButton
            questions={shamCollection?.intakeQuestions || []}
            formFieldGroup={shamCollection?.formFieldGroup || {}}
          />
        </Grid>
      </Grid>
    </InfoPanel>
  );
};
export default VideoIntakePreview;
