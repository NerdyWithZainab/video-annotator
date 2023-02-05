import { useState, useEffect, useContext } from "react";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../contexts/authContext";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const authStateChanged = async (authState: Auth | null) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    } else {
      setAuthUser(authState);
      setLoading(false);
    }
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const { auth, loading: contextLoading } = useContext(AuthContext);

  useEffect(() => {
    console.log("deleteMe got here c1 auth changed: ");
    console.log(authStateChanged);
    if (authStateChanged) {
      const unsubscribe = auth.onAuthStateChanged(authStateChanged);
      return () => unsubscribe();
    }
    return;
  }, []);

  const login = (email: string, password: string) => {
    console.log("deleteMe got here b1 and auth is: ");
    console.log(auth);
    // return signInWithEmailAndPassword(auth, email, password);
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      console.log("deleteMe e1 and res is: ");
      console.log(res);
      // @TODO left off here trying to figure out how to update the context from here
    });
    // if (!authUser) {
    //   signInWithEmailAndPassword(auth, email, password);
    // }
  };

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const signOut = () => auth.signOut().then(clear);

  return {
    authUser,
    loading,
    login,
    createUserWithEmailAndPassword,
    signOut,
  };
}
