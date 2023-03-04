import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import { useIntl, IntlShape } from "react-intl";

const MyActivityLogPanel: React.FC<{
  myActivityLogData: {
    activities: {
      id: string;
      date: Date;
      pointsEarned: number;
      details: string;
    }[];
  };
}> = ({ myActivityLogData }) => {
  const intl: IntlShape = useIntl();
  return (
    <InfoPanel
      titleId="MY_ACTIVITY_LOG"
      titleDefault="My activity log"
      key="my-activity-log"
    >
      {myActivityLogData?.activities?.map((activity) => {
        const [month, day, year] = [
          activity?.date?.getMonth(),
          activity?.date?.getDate(),
          activity?.date?.getFullYear(),
        ];
        const earnedOrLost: string =
          activity?.pointsEarned > 0
            ? intl.formatMessage({ id: "EARNED", defaultMessage: "Earned" })
            : intl.formatMessage({ id: "LOST", defaultMessage: "Lost" });
        const message: string =
          month +
          "/" +
          day +
          "/" +
          year +
          ": " +
          earnedOrLost +
          " " +
          Math.abs(activity?.pointsEarned) +
          " " +
          intl.formatMessage({
            id: "POINTS_DUE_TO",
            defaultMessage: "points due to",
          }) +
          " " +
          activity?.details;
        return <InfoPanelBody key={activity?.id}>{message}</InfoPanelBody>;
      })}
    </InfoPanel>
  );
};

export default MyActivityLogPanel;
