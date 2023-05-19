import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CollectionDetailsEdit from "../../components/CollectionDetailsEdit";
import CollectionDetailsView from "../../components/CollectionDetailsView";
import VideoIntakePreview from "../../components/VideoIntakePreview";
import VideoIntakeQuestions from "../../components/VideoIntakeQuestions";
import { Collection, FormFieldGroup } from "../../types";
import { shamCollection } from "../../dummy_data/dummyCollection";
import { updateCollection } from "../../utilities/singleFormFieldUtils";

const SingleCollection: React.FC = () => {
  console.log("deleteMe SingleCollection renders");
  const [formValues, setFormValues] = useState<{}>({});
  const [areFormValuesInvalid, setAreFormValuesInvalid] = useState<{}>({});
  const [collection, setCollection] = useState<Collection>();
  const [isCollectionDetailsInEditMode, setIsCollectionDetailsInEditMode] =
    useState<boolean>(false);

  useEffect(() => {
    const initialCollection = { ...shamCollection };
    initialCollection.formFieldGroup = formFieldGroup;
    setCollection(initialCollection);
  }, []);

  const formFieldGroup: FormFieldGroup = {
    title: "FormFieldGroupForTheWholeDummyCollection",
    setValues: setFormValues,
    actualValues: formValues, // @TODO this is a candidate as well
    isInvalids: areFormValuesInvalid,
    setIsInvalids: setAreFormValuesInvalid,
  };

  useEffect(() => {
    console.log("deleteMe got here d1. actualValues is now: ");
    console.log(formFieldGroup?.actualValues);
    setCollection((prevState: any) => {
      return { ...prevState, formFieldGroup: formFieldGroup };
    });
  }, [formFieldGroup?.actualValues]);

  return (
    <Grid container spacing={2} style={{ marginTop: "1vh" }}>
      <Grid item sm={12} md={12}>
        {isCollectionDetailsInEditMode ? (
          <CollectionDetailsEdit
            collection={collection}
            setIsCollectionDetailsInEditMode={setIsCollectionDetailsInEditMode}
          />
        ) : (
          <CollectionDetailsView
            collection={collection}
            setIsCollectionDetailsInEditMode={setIsCollectionDetailsInEditMode}
          />
        )}
      </Grid>
      <Grid item sm={12} md={4}>
        {collection && (
          <VideoIntakeQuestions
            collection={collection}
            setCollection={setCollection}
          />
        )}
      </Grid>
      <Grid item sm={12} md={8}>
        {collection && (
          <VideoIntakePreview collection={collection} formValues={formValues} />
        )}
      </Grid>
    </Grid>
  );
};

export default SingleCollection;
