import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import CustomError from "../../components/Error";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";
import { useIntl, IntlShape } from "react-intl";

const VerifyEmailAddress: React.FC = () => {
  // console.log("deleteMe render happens");
  const { verifyEmail, authError, user, emailVerified } = useFirebaseAuth();
  const intl: IntlShape = useIntl();
  const router: NextRouter = useRouter();
  const oobCode: string = router?.query?.oobCode?.toString() || "";
  const [verifyCalled, setVerifyCalled] = useState<boolean>(false);

  const mutation = useMutation((oobCode: string) => {
    // if (oobCode) {
    return verifyEmail(oobCode);
    // } else {
    //   return null;
    // }
  });

  console.log("deleteMe mutation is: ");
  console.log(mutation);
  useEffect(() => {
    const runAsyncVerifyEmail = async (
      oobCode: string,
      emailVerfied: boolean
    ) => {
      // console.log("deleteMe emailVerfied is: " + emailVerified);
      if (verifyCalled) {
        console.log("deleteMe verify has been called. Reloading page");
        router.reload();
      }
      if (user && !emailVerified && oobCode) {
        // console.log("deleteMe a1 calling verifyEmail");
        await verifyEmail(oobCode);
        setVerifyCalled(true);
        // user?.reload();
        // router.reload();
      }
    };
    runAsyncVerifyEmail(oobCode, emailVerified);
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
