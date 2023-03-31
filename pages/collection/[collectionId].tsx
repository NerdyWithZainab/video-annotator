import { Grid } from "@mui/material";
import CollectionDetails from "../../components/CollectionDetails";

import { Collection } from "../../types";

const SingleCollection: React.FC = () => {
  const shamCollection: Collection = {
    name: "Brazilian Jiu Jitsu",
    nameOfVideo: "Match",
    nameOfEvent: "Move",
    isPrivate: false,
    language: "eng",
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "1vh" }}>
      <Grid item sm={12} md={4}></Grid>
      <Grid item sm={12} md={4}>
        <CollectionDetails collection={shamCollection}></CollectionDetails>
      </Grid>
      <Grid item sm={12} md={4}></Grid>
    </Grid>
  );
};

export default SingleCollection;
