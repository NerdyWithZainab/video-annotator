import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import { useIntl, IntlShape } from "react-intl";

const MyCollectionsPanel: React.FC<{ myCollectionData: {} }> = ({
  myCollectionData,
}) => {
  return (
    <InfoPanel
      titleId="COLLECTIONS"
      titleDefault="Collections"
      key="collections-log"
    >
      <InfoPanelBody>
        <DataTable data={myCollectionData} />
      </InfoPanelBody>
    </InfoPanel>
  );
};

export default MyCollectionsPanel;
