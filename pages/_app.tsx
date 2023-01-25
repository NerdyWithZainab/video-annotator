import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@mui/material";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../firebase";
import { getAuth, Auth } from "firebase/auth";
import { AuthContext } from "./contexts/authContext";
// import { app, auth } from "../firebase";

export default function App({ Component, pageProps }: AppProps) {
  const messageMap = {
    en: englishMessages,
  };
  const locale = "en";

  let loading: boolean = true;
  const app = initializeApp(firebaseConfig);
  const auth: Auth | null = getAuth(app); // @TODO if wonky, maybe don't use type on this?
  loading = false; // @TODO??

  // const AuthContext = createContext({ auth: auth, loading: true }); // @TODO decide if the default should be null instead
  // const AuthContext = createContext({ auth: auth, loading: true }); // @TODO decide if the default should be null instead
  // const AuthContext = createContext({}); // @TODO decide if the default should be null instead

  // export const app = initializeApp(firebaseConfig);
  // export const auth = getAuth(app);

  // const isLocalDeploy: boolean = false;

  // let configData:
  //   | {
  //       apiKey: string;
  //       authDomain: string;
  //       projectId: string;
  //       storageBucket: string;
  //       messagingSenderId: string;
  //       appId: string;
  //       measurementId: string;
  //     }
  //   | undefined = {
  //   apiKey: process?.env?.apiKey || "",
  //   authDomain: process?.env?.authDomain || "",
  //   projectId: process?.env?.projectId || "",
  //   storageBucket: process?.env?.storageBucket || "",
  //   messagingSenderId: process?.env?.messagingSenderId || "",
  //   appId: process?.env?.appId || "",
  //   measurementId: process?.env?.measurementId || "",
  // };
  // if (isLocalDeploy) {
  //   // configData = firebaseConfig;
  // }
  // if (configData?.apiKey) {
  // @TODO flesh out with a more robust checker of non-emptiness
  // const app = initializeApp(configData);
  if (app.name && typeof window !== "undefined") {
    const analytics = getAnalytics(app);
  }
  // }

  return (
    <AuthContext.Provider value={{ auth: auth, loading: loading }}>
      <IntlProvider
        messages={messageMap[locale]}
        locale={locale}
        defaultLocale="en"
      >
        <Container>
          <Component {...pageProps} />
        </Container>
      </IntlProvider>
    </AuthContext.Provider>
  );
}
