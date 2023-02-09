import { createContext, useState } from "react";
import { User } from "firebase/auth";

// const [auth, setAuth] = useState<any>(null);
// const auth: Auth | null = null;
const auth: any = null;
const user: any = null; // @TODO maybe revisit and get the type right
const setUser: any = () => {};

export const AuthContext = createContext({
  auth,
  user,
  loading: true,
  setUser,
});
