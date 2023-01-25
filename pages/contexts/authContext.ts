import { createContext } from "react";
import { Auth } from "firebase/auth";

const auth: Auth | null = null;

export const AuthContext = createContext({ auth: auth, loading: true });
