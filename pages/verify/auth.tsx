import { useRouter, NextRouter } from "next/router";

import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import CustomError from "../../components/Error";
const VerifyEmailAddress: React.FC = () => {
  // const currentUser = auth?.currentUser;

  const router: NextRouter = useRouter();
  const { verifyEmail, authError } = useFirebaseAuth();
  const oobCode: string | undefined = router?.query?.oobCode?.toString() || "";
  console.log("deleteMe oobCode is: ");
  console.log(oobCode);
  if (oobCode) {
    verifyEmail(oobCode);
  }

  return (
    <>
      <h1>Email verified?</h1>
      {authError && <CustomError errorMsg={authError} />}
    </>
  );
};

export default VerifyEmailAddress;
