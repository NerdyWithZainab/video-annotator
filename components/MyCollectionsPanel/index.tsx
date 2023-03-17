import DataTable from "../DataTable";
import InfoPanel from "../InfoPanel";

const MyCollectionsPanel: React.FC<{
  myCollectionData: {}[];
}> = ({ myCollectionData }) => {
  return (
    <InfoPanel
      titleId="COLLECTIONS"
      titleDefault="Collections"
      key="collections-log"
    >
      <DataTable
        data={myCollectionData}
        colNamesToDisplay={{ name: "Name" }}
        actionButtonsToDisplay={{ edit: "Edit", view: "View" }}
      />
    </InfoPanel>
  );
};

export default MyCollectionsPanel;
