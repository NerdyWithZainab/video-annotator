import { useState, useEffect, useContext } from "react";
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthContext } from "../contexts/authContext";

export default function useFirebaseAuth() {
  const { auth, user, setUser } = useContext(AuthContext);
  //   const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        setEmailVerified(user?.emailVerified || false);
      });
    }
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

  const createUser = (auth: Auth, email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => auth.signOut().then(clear); // @TODO then send me to a welcome page

  return {
    auth,
    user,
    // loading,
    login,
    createUser,
    signOut,
    authError,
    emailVerified,
  };
}
