import { Grid } from "@mui/material";
import { useState } from "react";
import CollectionDetailsEdit from "../../components/CollectionDetailsEdit";
import CollectionDetailsView from "../../components/CollectionDetailsView";
import VideoIntakeQuestions from "../../components/VideoIntakeQuestions";

import { Collection } from "../../types";

const SingleCollection: React.FC = () => {
  const shamCollection: Collection = {
    name: "Brazilian Jiu Jitsu",
    nameOfVideo: "Match",
    nameOfEvent: "Move",
    isPrivate: false,
  };

  const [isCollectionDetailsInEditMode, setIsCollectionDetailsInEditMode] =
    useState<boolean>(false);

  return (
    <Grid container spacing={2} style={{ marginTop: "1vh" }}>
      <Grid item sm={12} md={3}></Grid>
      <Grid item sm={12} md={6}>
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
      <Grid item sm={12} md={3}></Grid>
      <Grid item sm={12} md={2}>
        <VideoIntakeQuestions collection={shamCollection} />
      </Grid>
      <Grid item sm={12} md={10}></Grid>
    </Grid>
  );
};

export default SingleCollection;
