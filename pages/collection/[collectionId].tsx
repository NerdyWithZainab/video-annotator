import { Grid } from "@mui/material";
import CollectionDetails from "../../components/CollectionDetails";

const SingleCollection: React.FC = () => {
  return (
    <Grid container spacing={2} style={{ marginTop: "1vh" }}>
      {/* @TODO align this in the middle */}
      <Grid item sm={12} md={4}>
        <CollectionDetails></CollectionDetails>
      </Grid>
    </Grid>
  );
};

export default SingleCollection;
