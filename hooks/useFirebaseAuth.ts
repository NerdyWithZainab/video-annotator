import { useState, useEffect, useContext } from "react";
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  applyActionCode,
  User,
} from "firebase/auth";
import { AuthContext } from "../contexts/authContext";

export default function useFirebaseAuth() {
  //   console.log("deleteMe useFirebaseAuth gets rendered");
  const { auth, user, setUser } = useContext(AuthContext);
  //   const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    let unsub = () => {};
    if (auth) {
      unsub = onAuthStateChanged(auth, (user) => {
        // console.log("deleteMe user state changed in the hook and is now: ");
        // console.log(user);
        setUser(user);
        setEmailVerified(user?.emailVerified || false);
      });
    }

    return unsub();
  }, [auth, setUser]);

  const clear = () => {
    setUser(null);
    // setLoading(true);
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        setUser(res?.user);
      });
    } catch (error: any) {
      setUser(null);
      setAuthError(error?.message);
    }
  };

  const createUser = async (auth: Auth, email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password); // @TODO how does user know to update on this one without calling setUser??
    console.log("deleteMe res for createUser is: ");
    console.log(res);
    setUser(res.user);
    return res;
  };

  const signOut = () => auth.signOut().then(clear); // @TODO then send me to a welcome page

  const verifyEmail = async (oobCode: string): Promise<User> => {
    try {
      console.log("deleteMe a1 user before action code verify is:");
      console.log(auth.currentUser);
      const res = await applyActionCode(auth, oobCode);
      console.log("deleteMe res in verifyEmail is: ");
      console.log(res);
      console.log("deleteMe a2 user after action code verify is:");
      console.log(auth.currentUser);
      await auth.currentUser.reload();
      console.log("deleteMe a3 user after user reload is:");
      console.log(auth.currentUser);
      setUser(auth.currentUser);
      // @TODO setUser
      // @TODO setEmailVerified ??
    } catch (error: any) {
      console.log("deleteMe got an error when verifying email");
      setAuthError(error.message);
    } finally {
      return auth.currentUser;
    }
  };

  return {
    auth,
    user,
    // loading,
    login,
    createUser,
    signOut,
    authError,
    emailVerified,
    verifyEmail,
    setAuthError,
  };
}
