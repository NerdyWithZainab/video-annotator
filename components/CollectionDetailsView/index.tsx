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
  setIsCollectionDetailsInEditMode: (val: boolean) => void;
}> = ({ collection, setIsCollectionDetailsInEditMode }) => {
  // console.log("deleteMe collection in CollectionDetailsView is currently");
  // console.log(collection);
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
        {map(collection, (collectionEl, elKey, wholeCollection) => {
          const showInView: boolean =
            !wholeCollection.excludeFromDetailList.includes(elKey.toString());
          return (
            <Grid key={elKey} item lg={12} sm={12}>
              {showInView && (
                <Typography key={elKey}>
                  {convertCamelCaseToCapitalCase(elKey)} :{" "}
                  {capitalizeEachWord(collectionEl?.toString() || "No value")}
                </Typography>
              )}
            </Grid>
          );
        })}
      </Grid>
    </InfoPanel>
  );
};

export default CollectionDetailsView;
