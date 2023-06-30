import { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";
import CollectionDetailsEdit from "../../components/CollectionDetailsEdit";
import CollectionDetailsView from "../../components/CollectionDetailsView";
import VideoIntakePreview from "../../components/VideoIntakePreview";
import VideoIntakeQuestions from "../../components/VideoIntakeQuestions";
import { Collection, FormFieldGroup } from "../../types";
import { shamCollection } from "../../dummy_data/dummyCollection";
import IndividualIntakeQuestions from "../../components/IndividualIntakeQuestions";
import IndividualIntakePreview from "../../components/IndividualIntakePreview";

const SingleCollection: React.FC = () => {
  const [videoQuestionFormValues, setVideoQuestionFormValues] = useState<{}>(
    {}
  );
  const [individualQuestionFormValues, setIndividualQuestionFormValues] =
    useState<{}>({});
  const [
    arevideoQuestionFormValuesInvalid,
    setArevideoQuestionFormValuesInvalid,
  ] = useState<{}>({});
  const [
    areindividualQuestionFormValuesInvalid,
    setAreindividualQuestionFormValuesInvalid,
  ] = useState<{}>({});
  const [collection, setCollection] = useState<Collection>();
  const [isCollectionDetailsInEditMode, setIsCollectionDetailsInEditMode] =
    useState<boolean>(false);

  useEffect(() => {
    const initialCollection = { ...shamCollection };
    initialCollection.videoQuestionsFormFieldGroup =
      videoQuestionsFormFieldGroup;
    initialCollection.individualQuestionsFormFieldGroup =
      individualQuestionsFormFieldGroup;
    setCollection(initialCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const videoQuestionsFormFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      title: "FormFieldGroupForTheWholeDummyCollection",
      setValues: setVideoQuestionFormValues,
      actualValues: videoQuestionFormValues,
      isInvalids: arevideoQuestionFormValuesInvalid,
      setIsInvalids: setArevideoQuestionFormValuesInvalid,
    };
  }, [arevideoQuestionFormValuesInvalid, videoQuestionFormValues]);

  const individualQuestionsFormFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      title: "FormFieldGroupForTheWholeDummyCollection",
      setValues: setIndividualQuestionFormValues,
      actualValues: individualQuestionFormValues,
      isInvalids: areindividualQuestionFormValuesInvalid,
      setIsInvalids: setAreindividualQuestionFormValuesInvalid,
    };
  }, [areindividualQuestionFormValuesInvalid, individualQuestionFormValues]);

  useEffect(() => {
    setCollection((prevState: any) => {
      return { ...prevState, formFieldGroup: videoQuestionsFormFieldGroup };
    });
  }, [
    videoQuestionsFormFieldGroup,
    videoQuestionsFormFieldGroup?.actualValues,
  ]);

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
            {collection && videoQuestionsFormFieldGroup && (
              <VideoIntakeQuestions
                collection={collection}
                setCollection={setCollection}
                formFieldGroup={videoQuestionsFormFieldGroup}
              />
            )}
          </Grid>
          <Grid item sm={12} md={8}>
            {collection && <VideoIntakePreview collection={collection} />}
          </Grid>
          <Grid item sm={12} md={4}>
            {collection && videoQuestionsFormFieldGroup && (
              <IndividualIntakeQuestions
                collection={collection}
                setCollection={setCollection}
                formFieldGroup={individualQuestionsFormFieldGroup}
              />
            )}
          </Grid>
          <Grid item sm={12} md={8}>
            {collection && <IndividualIntakePreview collection={collection} />}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SingleCollection;
