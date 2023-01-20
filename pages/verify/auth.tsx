import { useRouter, NextRouter } from "next/router";

import { getAuth, Auth } from "firebase/auth";

const VerifyEmailAddress: React.FC = () => {
  const auth: Auth = getAuth();
  const currentUser = auth?.currentUser;
  console.log("deleteMe auth is currently: ");
  console.log(auth);
  console.log("deleteMe current user info is: ");
  console.log(currentUser);

  const router: NextRouter = useRouter();
  console.log("deleteMe router is: ");
  console.log(router);
  //   const query =

  return <h1>Email verified?</h1>;
};

export default VerifyEmailAddress;
