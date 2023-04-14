import { Grid } from "@mui/material";
import { useState } from "react";
import CollectionDetailsEdit from "../../components/CollectionDetailsEdit";
import CollectionDetailsView from "../../components/CollectionDetailsView";
import VideoIntakePreview from "../../components/VideoIntakePreview";
import VideoIntakeQuestions from "../../components/VideoIntakeQuestions";

import { Collection, Question } from "../../types";

const SingleCollection: React.FC = () => {


  const firstQuestion: Question = {
    label: "URL",
    type: "URL",
    language: "English",
    isRequired: true,
    testId: "url",
    doNotDisplay: [],
    shouldBeCheckboxes: [];
    setValue?: (input: any)=>void,
    actualValue?: {},
    isValid?: {},
    setIsValid?: ({}) =>void,
    invalidInputMessage: ,
    validatorMethod:
  };
  const shamCollection: Collection = {
    name: "Brazilian Jiu Jitsu",
    nameOfVideo: "Match",
    nameOfEvent: "Move",
    isPrivate: false,
    language: "English",
    intakeQuestions: [firstQuestion],
    excludeFromDetailList: ["intakeQuestions", "excludeFromDetailList"],
  };

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
