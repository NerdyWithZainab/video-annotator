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
  const { auth, user, setUser } = useContext(AuthContext);
  //   const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    let unsub = () => {};
    if (auth) {
      unsub = onAuthStateChanged(auth, (user) => {
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
    setUser(res?.user);
    return res;
  };

  const signOut = () => auth.signOut().then(clear); // @TODO then send me to a welcome page

  const verifyEmail = async (oobCode: string): Promise<User> => {
    try {
      await applyActionCode(auth, oobCode);
      await auth.currentUser.reload(); // @TODO no longer necessary?
      setUser(auth.currentUser);
      // @TODO setEmailVerified ??
    } catch (error: any) {
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
