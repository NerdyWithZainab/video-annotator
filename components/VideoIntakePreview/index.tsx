import { Grid } from "@mui/material";
import { map } from "lodash-es";
import { Collection, Question } from "../../types";
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
    <InfoPanelBody bodyId="INTAKE_PREVIEW_DETAILS" bodyDefault="Contributors to your collection will see the following questions when they submit new videos to the collection: " />
      <Grid container>
        {map(collection?.intakeQuestions, (intakeQuestion) => {
          return (
            <Grid item lg={12} sm={12}>
              <SingleFormField question={intakeQuestion} collection={collection} key={intakeQuestion?.label} />
            </Grid>
          );
        })}
      </Grid>
    </InfoPanel>
  );
};
export default VideoIntakePreview;
