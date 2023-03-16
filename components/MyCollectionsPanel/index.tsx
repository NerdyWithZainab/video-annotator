import DataTable from "../DataTable";
import InfoPanel from "../InfoPanel";

const MyCollectionsPanel: React.FC<{
  myCollectionData: {}[];
  visibleColumnDict?: {};
}> = ({ myCollectionData, visibleColumnDict = {} }) => {
  return (
    <InfoPanel
      titleId="COLLECTIONS"
      titleDefault="Collections"
      key="collections-log"
    >
      <DataTable data={myCollectionData} colNamesToDisplay={{ name: "Name" }} />
    </InfoPanel>
  );
};

export default MyCollectionsPanel;
