import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import { useState, useEffect } from "react";
// import useFirebaseAuth from "../hooks/useFirebaseAuth";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { firebaseConfig } from "../firebase";
import { getAuth, User } from "firebase/auth";
import { AuthContext } from "../contexts/authContext";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const messageMap = {
    en: englishMessages,
  };

  const [user, setUser] = useState<User | null>(null);

  const locale = "en";

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  let loading: boolean = true; // @TODO fix this

  useEffect(() => {
    setUser(getAuth(app)?.currentUser);
  }, [auth, app]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#004d40",
      },
      secondary: {
        main: "#26a69a",
      },
    },
  });

  if (app.name && typeof window !== "undefined") {
    const analytics = getAnalytics(app); // @TODO flesh out
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ auth, user, loading, setUser }}>
        <ThemeProvider theme={theme}>
          <IntlProvider
            messages={messageMap[locale]}
            locale={locale}
            defaultLocale="en"
          >
            <Container>
              <Navbar />
              {/* <p>{user ? JSON.stringify(user) : null}</p> */}
              <Component {...pageProps} />
            </Container>
          </IntlProvider>
        </ThemeProvider>
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
