import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { Grid } from "@mui/material";
import { useIntl, IntlShape } from "react-intl";
import UserDetailPanel from "../../components/UserDetailPanel";
import MySubScriptionPanel from "../../components/MySubScriptionPanel";

const Me: React.FC = () => {
  const { user, authError } = useFirebaseAuth();
  //   const { months } = useMonths();
  //   const currentMonthDigit: number = new Date().getMonth();
  const intl: IntlShape = useIntl();

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
    </Grid>
  );
};

export default Me;
