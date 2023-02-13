import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import CustomError from "../../components/Error";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";
import { useIntl, IntlShape } from "react-intl";

const VerifyEmailAddress: React.FC = () => {
  const { verifyEmail, authError, user, emailVerified } = useFirebaseAuth();
  const intl: IntlShape = useIntl();
  const router: NextRouter = useRouter();
  const oobCode: string = router?.query?.oobCode?.toString() || "";
  const [verifyCalled, setVerifyCalled] = useState<boolean>(false);

  useEffect(() => {
    const runAsyncVerifyEmail = async (
      oobCode: string,
      emailVerfied: boolean
    ) => {
      if (verifyCalled) {
        router.reload(); //email verification with firebase auth for some crazy reason seems to need a page reload.
      }
      if (user && !emailVerified && oobCode) {
        await verifyEmail(oobCode);
        setVerifyCalled(true);
      }
    };
    runAsyncVerifyEmail(oobCode, emailVerified); // @TODO decide whether this is even necessary
  }, [emailVerified, oobCode, user, verifyEmail, router, verifyCalled]); // @TODO decide how best to handle the asynchronicity having to do with getting the user

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
      {!user && (
        <CustomError
          errorMsg={intl.formatMessage({
            id: "USER_NOT_LOGGED_IN",
            defaultMessage:
              "We can't find the user data; make sure you're logged in.",
          })}
        />
      )}
    </>
  );
};

export default VerifyEmailAddress;
