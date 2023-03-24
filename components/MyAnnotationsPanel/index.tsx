import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import { FormattedMessage } from "react-intl";
import { Alert } from "@mui/material";

const MyAnnotationsPanel: React.FC<{
  myAnnotationData: {
    totalAnnotationsRecorded: number;
    totalAnnotationsRecordedThisMonth: number;
    averageRatingOfTotalAnnotationsRecorded: number;
  };
}> = ({ myAnnotationData }) => {
  return (
    <InfoPanel
      titleId="MY_ANNOTATIONS"
      titleDefault="My Annotations"
      key="my-annotations"
    >
      <Alert severity="info" style={{ marginBottom: "1vw" }}>
        <FormattedMessage
          id="ANNOTATION_ALERT"
          defaultMessage="Earn more annotation credits by annotating more videos"
        />
      </Alert>
      <InfoPanelBody
        bodyId="TOTAL_ANNOTATIONS_RECORDED"
        bodyDefault="Total annotations recorded"
      >
        {": "}
        {myAnnotationData?.totalAnnotationsRecorded}
      </InfoPanelBody>
      <InfoPanelBody
        bodyId="TOTAL_ANNOTATIONS_THIS_MONTH"
        bodyDefault="Total annotations recorded this month"
      >
        {": "}
        {myAnnotationData?.totalAnnotationsRecordedThisMonth}
      </InfoPanelBody>
      <InfoPanelBody
        bodyId="AVERAGE_RATING_OF_ANNOTATIONS"
        bodyDefault="Average rating of total annotations recorded"
      >
        {": "}
        {myAnnotationData?.averageRatingOfTotalAnnotationsRecorded}
      </InfoPanelBody>
    </InfoPanel>
  );
};

export default MyAnnotationsPanel;
