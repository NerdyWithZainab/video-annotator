import { useState, useEffect, useContext } from "react";
import { Auth } from "firebase/auth";
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
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const signInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const signOut = () => auth.signOut().then(clear);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}
