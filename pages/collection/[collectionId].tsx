import { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import CollectionDetailsEdit from "../../components/CollectionDetailsEdit";
import CollectionDetailsView from "../../components/CollectionDetailsView";
import VideoIntakePreview from "../../components/VideoIntakePreview";
import VideoIntakeQuestions from "../../components/VideoIntakeQuestions";
import { Collection, FormFieldGroup } from "../../types";
import { shamCollection } from "../../dummy_data/dummyCollection";

const SingleCollection: React.FC = () => {
  const [formValues, setFormValues] = useState<{}>({});
  const [areFormValuesInvalid, setAreFormValuesInvalid] = useState<{}>({});
  const [collection, setCollection] = useState<Collection>();
  const [isCollectionDetailsInEditMode, setIsCollectionDetailsInEditMode] =
    useState<boolean>(false);

  useEffect(() => {
    const initialCollection = { ...shamCollection };
    initialCollection.formFieldGroup = formFieldGroup;
    setCollection(initialCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      title: "FormFieldGroupForTheWholeDummyCollection",
      setValues: setFormValues,
      actualValues: formValues,
      isInvalids: areFormValuesInvalid,
      setIsInvalids: setAreFormValuesInvalid,
    };
  }, [areFormValuesInvalid, formValues]);

  useEffect(() => {
    setCollection((prevState: any) => {
      return { ...prevState, formFieldGroup: formFieldGroup };
    });
  }, [formFieldGroup, formFieldGroup?.actualValues]);

  return (
    <Grid container spacing={2} style={{ marginTop: "1vh" }}>
      {collection && (
        <>
          <Grid item sm={12} md={12}>
            {isCollectionDetailsInEditMode ? (
              <CollectionDetailsEdit
                collection={collection}
                setIsCollectionDetailsInEditMode={
                  setIsCollectionDetailsInEditMode
                }
              />
            ) : (
              <CollectionDetailsView
                collection={collection}
                setIsCollectionDetailsInEditMode={
                  setIsCollectionDetailsInEditMode
                }
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
              <VideoIntakePreview
                collection={collection}
                formFiledGroup={formFieldGroup}
                formValues={formValues}
              />
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SingleCollection;
