import { Grid } from "@mui/material";
import { useState } from "react";
import CollectionDetailsEdit from "../../components/CollectionDetailsEdit";
import CollectionDetailsView from "../../components/CollectionDetailsView";
import VideoIntakePreview from "../../components/VideoIntakePreview";
import VideoIntakeQuestions from "../../components/VideoIntakeQuestions";

import { Collection, FormFieldGroup, SingleFormField } from "../../types";
import { isValidUrl } from "../../utilities/validators";
import { shamCollection } from '../../dummy_data/dummyCollection';

const SingleCollection: React.FC = () => {
  const [formValues, setFormValues] = useState<{}>({});
  const [areFormValuesInvalid, setAreFormValuesInvalid] = useState<{}>({});

  const shamFormFieldGroup: FormFieldGroup = {
    setValues: setFormValues,
    actualValues: formValues,
    isInvalids: areFormValuesInvalid,
    setIsInvalids: setAreFormValuesInvalid
  };
  shamCollection.formFieldGroup = shamFormFieldGroup;



  const [isCollectionDetailsInEditMode, setIsCollectionDetailsInEditMode] =
    useState<boolean>(false);

  return (
    <Grid container spacing={2} style={{ marginTop: "1vh" }}>
      {/* <Grid item sm={12} md={3}></Grid> */}
      <Grid item sm={12} md={12}>
        {isCollectionDetailsInEditMode && (
          <CollectionDetailsEdit
            collection={shamCollection}
            setIsCollectionDetailsInEditMode={setIsCollectionDetailsInEditMode}
          ></CollectionDetailsEdit>
        )}
        {!isCollectionDetailsInEditMode && (
          <CollectionDetailsView
            collection={shamCollection}
            setIsCollectionDetailsInEditMode={setIsCollectionDetailsInEditMode}
          ></CollectionDetailsView>
        )}
      </Grid>
      {/* <Grid item sm={12} md={3}></Grid> */}
      <Grid item sm={12} md={4}>
        <VideoIntakeQuestions collection={shamCollection} />
      </Grid>
      <Grid item sm={12} md={8}>
        <VideoIntakePreview collection={shamCollection} />
      </Grid>
    </Grid>
  );
};

export default SingleCollection;
