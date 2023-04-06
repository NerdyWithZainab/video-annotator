import { Grid, Typography } from "@mui/material";

import { map } from "lodash-es";

import { Collection } from "../../types";
import InfoPanel from "../InfoPanel";
import {
  capitalizeEachWord,
  convertCamelCaseToCapitalCase,
} from "../../utilities/textUtils";

const CollectionDetailsView: React.FC<{
  collection: Collection;
  setIsCollectionDetailsInEditMode: () => {};
}> = ({ collection, setIsCollectionDetailsInEditMode }) => {
  return (
    <InfoPanel
      titleId="COLLECTION_DETAILS"
      titleDefault="Collection Details"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
      includeCornerEditButton={true}
      setEditButton={setIsCollectionDetailsInEditMode}
    >
      <Grid container>
        {map(collection, (collectionEl, elKey) => {
          return (
            <Grid item lg={12} sm={12}>
              <Typography>
                {convertCamelCaseToCapitalCase(elKey)} :{" "}
                {capitalizeEachWord(collectionEl.toString())}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </InfoPanel>
  );
};

export default CollectionDetailsView;
