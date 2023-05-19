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
  formValues: any;
}> = ({ collection, formValues }) => {
  console.log("deleteMe collection in VideoIntakePreview upon rendering is: ");
  console.log(collection);
  // useEffect(() => {
  //   console.log("deleteMe got here b3 and collection is now");
  //   console.log(collection);
  //   // console.log("deleteMe VideoIntakePreview - formValues:", formValues);
  // }, [formValues]);

  const formFieldGroup: FormFieldGroup | {} = get(
    collection,
    "formFieldGroup",
    {}
  );
  // console.log("deleteMe a1 formFieldGroup is: ");
  // console.log(formFieldGroup);

  // const acutalVals: {} = get(formFieldGroup, ["actualValues"], {});

  // useEffect(() => {
  //   console.log("deleteMe got here b4");
  //   console.log("deleteMe VideoIntakePreview - formFieldGroup:", acutalVals);
  //   // @TODO update collection??
  // }, [acutalVals]);

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
        <Grid item lg={12} sm={12}>
          <ComposedFormSubmissionButton
            questions={collection?.intakeQuestions || []}
            formFieldGroup={collection?.formFieldGroup || {}} // @TODO maybe change this from sham to whatever the passed-in collection is? Think about this and test it before you do it.
          />
        </Grid>
      </Grid>
    </InfoPanel>
  );
};
export default VideoIntakePreview;
