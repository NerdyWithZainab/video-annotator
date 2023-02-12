import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import CustomError from "../../components/Error";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

const VerifyEmailAddress: React.FC = () => {
  // console.log("deleteMe render happens");
  const { verifyEmail, authError, user, emailVerified } = useFirebaseAuth();
  const router: NextRouter = useRouter();
  const oobCode: string | undefined = router?.query?.oobCode?.toString() || "";
  const [verifyCalled, setVerifyCalled] = useState<boolean>(false);
  useEffect(() => {
    // console.log("deleteMe emailVerfied is: " + emailVerified);
    if (!emailVerified && oobCode) {
      // console.log("deleteMe a1 calling verifyEmail");
      verifyEmail(oobCode);
      setVerifyCalled(true);
      // user?.reload();
      // router.reload();
    }
  }, [emailVerified, oobCode, user, verifyEmail]); // @TODO decide how best to handle the asynchronicity having to do with getting the user

  return (
    <>
      {!emailVerified && (
        <Typography variant="h6" style={{ marginTop: 30 }}>
          <FormattedMessage
            id="EMAIL_VERIFYING"
            defaultMessage="Attempting to verify your email address..."
          />
        </Typography>
      )}
      {emailVerified && (
        <Typography variant="h6" style={{ marginTop: 30 }}>
          <FormattedMessage
            id="EMAIL_VERIFIED"
            defaultMessage="Congratulations! You email address has been varified."
          />
        </Typography>
      )}
      {verifyCalled && !emailVerified && <CustomError errorMsg={authError} />}
    </>
  );
};

export default VerifyEmailAddress;
