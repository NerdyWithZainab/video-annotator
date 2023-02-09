import { useRouter, NextRouter } from "next/router";

import { getAuth, Auth } from "firebase/auth";

const VerifyEmailAddress: React.FC = () => {
  const auth: Auth = getAuth();
  const currentUser = auth?.currentUser;

  const router: NextRouter = useRouter();
  //   const query = // @TODO flesh out

  return <h1>Email verified?</h1>;
};

export default VerifyEmailAddress;
