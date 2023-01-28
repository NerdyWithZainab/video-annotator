import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@mui/material";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from "../firebase";
import { getAuth, Auth } from "firebase/auth";
import { AuthContext } from "../contexts/authContext";
// import { wrapper } from "../firebase";

export default function App({ Component, pageProps }: AppProps) {
  const messageMap = {
    en: englishMessages,
  };
  const locale = "en";

  let loading: boolean = true;
  const app = initializeApp(firebaseConfig);
  const auth: Auth | null = getAuth(app); // @TODO if wonky, improve the TypeScript here
  loading = false; // @TODO improve??

  if (app.name && typeof window !== "undefined") {
    const analytics = getAnalytics(app);
  }
  // const auth: Auth = wrapper.auth;

  return (
    <AuthContext.Provider value={{ auth, loading }}>
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
