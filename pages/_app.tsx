import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import { themeOptions } from "../styles/materialTheme";
import { useState, useEffect } from "react";

import { firebaseConfig } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { AuthContext } from "../contexts/authContext";
import Navbar from "../components/Navbar";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// import { wrapper } from "../firebase";

export default function App({ Component, pageProps }: AppProps) {
  const messageMap = {
    en: englishMessages,
  };
  const [user, setUser] = useState<User | null>(null);
  const locale = "en";

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  let loading: boolean = true;

  useEffect(() => {
    setUser(getAuth(app)?.currentUser);
  }, [auth]);
  // const theme = createTheme(themeOptions);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#004d40",
      },
      secondary: {
        main: "#26a69a",
      },
    },
    // overrides: {
    //   MuiAppBar: {
    //     colorPrimary: {
    //       backgroundColor: "#662E9B",
    //     },
    //   },
    // },
  });

  // const auth: Auth | null = getAuth(app); // @TODO if wonky, improve the TypeScript here
  loading = false; // @TODO improve??

  if (app.name && typeof window !== "undefined") {
    const analytics = getAnalytics(app);
  }
  // const auth: Auth = wrapper.auth;

  return (
    <AuthContext.Provider value={{ auth, user, loading, setUser }}>
      <ThemeProvider theme={theme}>
        <IntlProvider
          messages={messageMap[locale]}
          locale={locale}
          defaultLocale="en"
        >
          <Container>
            <Navbar />
            <Component {...pageProps} />
          </Container>
        </IntlProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
