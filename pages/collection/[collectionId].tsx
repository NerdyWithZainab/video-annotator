import { useEffect, useMemo, useRef, useState } from "react";
import { Grid } from "@mui/material";
import CollectionDetailsEdit from "../../components/CollectionDetailsEdit";
import CollectionDetailsView from "../../components/CollectionDetailsView";
import VideoIntakePreview from "../../components/VideoIntakePreview";
import VideoIntakeQuestions from "../../components/VideoIntakeQuestions";
import { Collection, FormFieldGroup } from "../../types";
import { shamCollection } from "../../dummy_data/dummyCollection";
import IndividualIntakeQuestions from "../../components/IndividualIntakeQuestions";
import IndividualIntakePreview from "../../components/IndividualIntakePreview";
import { get } from "lodash-es";
import EventIntakeQuestions from "../../components/EventIntakeQuestions";
import EventIntakePreview from "../../components/EventIntakePreview";

const SingleCollection: React.FC = () => {
  // console.log("deleteMe main collection page re-renders");
  const [videoQuestionFormValues, setVideoQuestionFormValues] = useState<{}>(
    {}
  );
  const [individualQuestionFormValues, setIndividualQuestionFormValues] =
    useState<{}>({});
  const [eventQuestionFormValues, setEventQuestionFormValues] = useState<{}>(
    {}
  );

  const [
    arevideoQuestionFormValuesInvalid,
    setArevideoQuestionFormValuesInvalid,
  ] = useState<{}>({});
  const [
    areIndividualQuestionFormValuesInvalid,
    setAreIndividualQuestionFormValuesInvalid,
  ] = useState<{}>({});
  const [
    areEventQuestionFormValuesInvalid,
    setAreEventQuestionFormValuesInvalid,
  ] = useState<{}>({});

  const [collection, setCollection] = useState<Collection>();
  const [isCollectionDetailsInEditMode, setIsCollectionDetailsInEditMode] =
    useState<boolean>(false);

  useEffect(() => {
    const initialCollection = { ...shamCollection };
    // console.log("deleteMe initialCollection is: ");
    // console.log(initialCollection);
    initialCollection.videoQuestionsFormFieldGroup =
      videoQuestionsFormFieldGroup;
    initialCollection.individualQuestionsFormFieldGroup =
      individualQuestionsFormFieldGroup;
    initialCollection.eventQuestionsFormFieldGroup =
      eventQuestionsFormFieldGroup;
    setCollection(initialCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const videoQuestionsFormFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      title: "VideoFormFieldGroupForTheWholeDummyCollection",
      setValues: setVideoQuestionFormValues,
      actualValues: videoQuestionFormValues,
      isInvalids: arevideoQuestionFormValuesInvalid,
      setIsInvalids: setArevideoQuestionFormValuesInvalid,
    };
  }, [arevideoQuestionFormValuesInvalid, videoQuestionFormValues]);

  const individualQuestionsFormFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      title: "IndividualFormFieldGroupForTheWholeDummyCollection",
      setValues: setIndividualQuestionFormValues,
      actualValues: individualQuestionFormValues,
      isInvalids: areIndividualQuestionFormValuesInvalid,
      setIsInvalids: setAreIndividualQuestionFormValuesInvalid,
    };
  }, [areIndividualQuestionFormValuesInvalid, individualQuestionFormValues]);

  const eventQuestionsFormFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      title: "EventFormFieldGroupForTheWholeDummyCollection",
      setValues: setEventQuestionFormValues,
      actualValues: eventQuestionFormValues,
      isInvalids: areEventQuestionFormValuesInvalid,
      setIsInvalids: setAreEventQuestionFormValuesInvalid,
    };
  }, [areEventQuestionFormValuesInvalid, eventQuestionFormValues]);

  useEffect(() => {
    setCollection((prevState: any) => {
      // console.log("deleteMe prevState in the useEffect is: ");
      // console.log(prevState);
      return {
        ...prevState,
        videoQuestionsFormFieldGroup: videoQuestionsFormFieldGroup,
        individualQuestionsFormFieldGroup: individualQuestionsFormFieldGroup,
        eventQuestionsFormFieldGroup: eventQuestionsFormFieldGroup,
      };
    });
  }, [
    videoQuestionsFormFieldGroup,
    videoQuestionsFormFieldGroup?.actualValues,
    individualQuestionsFormFieldGroup,
    individualQuestionsFormFieldGroup?.actualValues,
    eventQuestionsFormFieldGroup,
    eventQuestionsFormFieldGroup?.actualValues,
  ]);

  const videoPreviewRef = useRef(null);
  const videoIntakeRef = useRef(null);

  // useEffect(() => {
  //   console.log("deleteMe videoPreviewRef is: ");
  //   console.log(videoPreviewRef);
  //   // if (videoIntakeRef?.current) {
  //   //   videoIntakeRef.current.style.maxHeight = "100px";
  //   // }
  //   console.log("deleteMe videoIntakeRef is: ");
  //   console.log(videoIntakeRef);
  //   // const videoPreviewHeight = get(videoPreviewRef, [
  //   //   "current",
  //   //   "offsetHeight",
  //   // ]);

  //   // console.log(videoIntakeRef.current.classList);
  //   // videoIntakeRef.current.style.maxHeight = `500px`;
  //   // const videoIntakeRefStyle: any = get(videoIntakeRef, ["current", "style"]);
  //   // videoIntakeRefStyle.maxHeight = `500px`;
  //   // if (videoPreviewHeight && Boolean(videoIntakeRefStyle)) {
  //   //   videoIntakeRefStyle.maxHeight = `${videoPreviewHeight}px`;
  //   // }
  // }, [videoPreviewRef, videoIntakeRef]);

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
                // ref={videoIntakeRef}
                collection={collection}
                setCollection={setCollection}
                formFieldGroup={videoQuestionsFormFieldGroup}
              />
            )}
          </Grid>
          <Grid item sm={12} md={8}>
            {collection && (
              <VideoIntakePreview
                // ref={videoPreviewRef}
                collection={collection}
              />
            )}
          </Grid>
          <Grid item sm={12} md={4}>
            {collection && individualQuestionsFormFieldGroup && (
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
          <Grid item sm={12} md={4}>
            {collection && eventQuestionsFormFieldGroup && (
              <EventIntakeQuestions
                collection={collection}
                setCollection={setCollection}
                formFieldGroup={eventQuestionsFormFieldGroup}
              />
            )}
          </Grid>
          <Grid item sm={12} md={8}>
            {collection && <EventIntakePreview collection={collection} />}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SingleCollection;
