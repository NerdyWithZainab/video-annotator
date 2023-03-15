import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useIntl, IntlShape, FormattedMessage } from "react-intl";
import { reduce, map } from "lodash-es";

import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import { Paper, Typography } from "@mui/material";

const MyCollectionsPanel: React.FC<{
  myCollectionData: {}[];
  visibleColumnKeys: string[];
}> = ({ myCollectionData, visibleColumnKeys }) => {
  const rows: GridRowsProp = myCollectionData?.map((collection, idx) => {
    const renamedCollection: { [key: string]: any } = reduce(
      Object.values(collection),
      (memo: {}, el: any, elIdx: number) => {
        const colNum: number = elIdx + 1;
        return { ...memo, ["col" + colNum]: el };
      },
      {}
    );
    return { id: idx + 1, ...renamedCollection };
  });
  const safePrototypeCollection: {} = myCollectionData[0] || {};
  let tracker: number = 0;

  const columns: GridColDef[] = map(safePrototypeCollection, (el, elKey) => {
    tracker++;
    const cleanHeader: string = elKey.trim().toLowerCase();
    const headerName: string =
      cleanHeader.charAt(0).toUpperCase() + cleanHeader.slice(1);
    return {
      field: "col" + tracker,
      headerName: headerName,
      width: 150,
    };
  });

  // @TODO pull out the DataGrid and make into its own DataTable component with props data={myCollectionData} in this case.
  return (
    <InfoPanel
      titleId="COLLECTIONS"
      titleDefault="Collections"
      key="collections-log"
    >
      <DataGrid
        rows={rows}
        rowHeight={40}
        columns={columns}
        style={{ minHeight: 200, marginBottom: "2vh" }}
      />
    </InfoPanel>
  );
};

export default MyCollectionsPanel;
