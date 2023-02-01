import { createContext } from "react";
import { Auth } from "firebase/auth";

// const auth: Auth | null = null;
const auth: any = null; // @TODO maybe revisit and get the type right

export const AuthContext = createContext({ auth, loading: true });
