import DataTable from "../DataTable";
import InfoPanel from "../InfoPanel";

const CollectionsPanel: React.FC<{
  collectionData: {}[];
  titleId: string;
  titleDefault: string;
  colNamesToDisplay?: { [key: string]: any };
}> = ({ collectionData, titleId, titleDefault, colNamesToDisplay = {} }) => {
  return (
    <InfoPanel titleId={titleId} titleDefault={titleDefault} key={titleId}>
      <DataTable
        tableTitle={titleId}
        key={titleId}
        data={collectionData}
        colNamesToDisplay={colNamesToDisplay}
        actionButtonsToDisplay={{ edit: "Edit", view: "View" }}
      />
    </InfoPanel>
  );
};

export default CollectionsPanel;
