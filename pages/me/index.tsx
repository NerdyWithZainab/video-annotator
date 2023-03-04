import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { Grid } from "@mui/material";
import { useIntl, IntlShape } from "react-intl";
import UserDetailPanel from "../../components/UserDetailPanel";
import MySubScriptionPanel from "../../components/MySubscriptionPanel";
import MyAnnotationsPanel from "../../components/MyAnnotationsPanel";
import MyActivityLogPanel from "../../components/MyActivityLogPanel";
import FeedbackPanel from "../../components/FeedbackPanel";

const Me: React.FC = () => {
  const { user, authError } = useFirebaseAuth();
  const intl: IntlShape = useIntl();
  const shamMyAnnotationData: {
    totalAnnotationsRecorded: number;
    totalAnnotationsRecordedThisMonth: number;
    averageRatingOfTotalAnnotationsRecorded: number;
  } = {
    totalAnnotationsRecorded: 11,
    totalAnnotationsRecordedThisMonth: 5,
    averageRatingOfTotalAnnotationsRecorded: 1.3,
  };
  const shamMyActivityLogData: {
    activities: {
      id: string;
      date: Date;
      pointsEarned: number;
      details: string;
    }[];
  } = {
    activities: [
      {
        id: "1",
        date: new Date(2023, 1, 2),
        pointsEarned: 6,
        details: "annotating x, y, z",
      },
      {
        id: "2",
        date: new Date(2022, 2, 4),
        pointsEarned: -6,
        details: "2 downvotes for annotating a, b, c",
      },
      {
        id: "3",
        date: new Date(2021, 11, 29),
        pointsEarned: 6,
        details: "annotating p, q, r",
      },
      {
        id: "4",
        date: new Date(2019, 10, 29),
        pointsEarned: 6,
        details: "annotating a cool video",
      },
      {
        id: "5",
        date: new Date(2021, 11, 29),
        pointsEarned: 6,
        details: "annotating an uncool video",
      },
      {
        id: "6",
        date: new Date(2018, 7, 4),
        pointsEarned: -1,
        details: "annotating a totally unrelated video",
      },
      {
        id: "7",
        date: new Date(2018, 7, 4),
        pointsEarned: 3,
        details: "annotating a bright video",
      },
      {
        id: "8",
        date: new Date(2018, 7, 4),
        pointsEarned: -2,
        details: "annotating a sad video",
      },
      {
        id: "9",
        date: new Date(2018, 7, 4),
        pointsEarned: 11,
        details: "annotating a funny video",
      },
      {
        id: "10",
        date: new Date(2018, 7, 4),
        pointsEarned: 10,
        details: "annotating a sexy video",
      },
    ],
  };

  const email: string =
    user?.email ||
    intl.formatMessage({
      id: "UNKNOWN_EMAIL",
      defaultMessage: "Unknown Email Address",
    });
  const displayName: string = user?.providerData[0]?.displayName;
  return (
    <Grid container spacing={2} style={{ marginTop: 10 }}>
      <Grid item sm={12} md={6}>
        <UserDetailPanel
          displayName={displayName}
          email={email}
        ></UserDetailPanel>
      </Grid>
      <Grid item sm={12} md={6}>
        <MySubScriptionPanel />
      </Grid>
      <Grid item sm={12} md={6}>
        <MyAnnotationsPanel myAnnotationData={shamMyAnnotationData} />
      </Grid>
      <Grid item sm={12} md={6}>
        <MyActivityLogPanel myActivityLogData={shamMyActivityLogData} />
      </Grid>
      <Grid item sm={12} md={6}>
        <FeedbackPanel styleOverrides={{ maxHeight: 1000 }} />
      </Grid>
    </Grid>
  );
};

export default Me;
