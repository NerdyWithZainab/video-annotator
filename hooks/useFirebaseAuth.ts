import { useState, useEffect, useContext } from "react";
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { AuthContext } from "../contexts/authContext";

export default function useFirebaseAuth() {
  const {
    auth,
    user,
    loading: contextLoading,
    setUser,
  } = useContext(AuthContext);
  //   const [authUser, setAuthUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  //   const authStateChanged = async (authState: Auth | null) => {
  //     if (!authState) {
  //       //   setAuthUser(null);
  //       setUser(null);
  //       setLoading(false);
  //       return;
  //     } else {
  //       //   setAuthUser(authState);
  //       setUser(authState.currentUser);
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    // console.log("deleteMe got here c1 auth changed: ");
    // console.log(authStateChanged);
    onAuthStateChanged(auth, () => {
      console.log("deleteMe authState has changed...updating");
      setUser(auth.currentUser);
    });
    // if (authStateChanged) {
    //   setUser(auth.currentUser);
    //   const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    //   return () => unsubscribe();
    // }
    // return;
  }, [auth, setUser]);

  const clear = () => {
    // setAuthUser(null);
    setUser(null);
    setLoading(true);
  };

  const login = async (email: string, password: string) => {
    console.log("deleteMe got here b1 and auth is: ");
    console.log(auth);
    // return signInWithEmailAndPassword(auth, email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        console.log("deleteMe e1 and res is: ");
        console.log(res);
        setUser(res?.user);
      });
    } catch (error: any) {
      console.log("deleteMe error happened!:");
      console.log(error);
      setUser(null);
      setAuthError(error?.message);
    }
    // @TODO left off here trying to figure out how to update the context from here
    // if (!authUser) {
    //   signInWithEmailAndPassword(auth, email, password);
    // }
  };

  const createUser = (auth: Auth, email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signOut = () => auth.signOut().then(clear);

  return {
    auth,
    user,
    loading,
    login,
    createUser,
    signOut,
    authError,
  };
}
