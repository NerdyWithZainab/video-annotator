import { Grid } from "@mui/material";
import { map } from "lodash-es";
import { Collection, Question } from "../../types";
import InfoPanel from "../InfoPanel";
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
      <Grid container>
        {map(collection?.intakeQuestions, (intakeQuestion) => {
          return (
            <Grid item lg={12} sm={12}>
              <SingleFormField question={intakeQuestion} />
            </Grid>
          );
        })}
      </Grid>
    </InfoPanel>
  );
};
export default VideoIntakePreview;
