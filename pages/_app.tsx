import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import { themeOptions } from "../styles/materialTheme";

import { firebaseConfig } from "../firebase";
import { getAuth, Auth } from "firebase/auth";
import { AuthContext } from "../contexts/authContext";
import Navbar from "../components/Navbar";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


// import { wrapper } from "../firebase";

export default function App({ Component, pageProps }: AppProps) {
  const messageMap = {
    en: englishMessages,
  };
  const locale = "en";
  // const theme = createTheme(themeOptions);
  const theme = createTheme(adaptV4Theme({
    palette: {
      // mode: "light",
      primary: {
        main: "#004d40",
      },
      secondary: {
        main: "#26a69a",
      },
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: "#662E9B",
        },
      },
    },
  }));
  console.log("deleteMe theme primary in app.tsx is: ");
  console.log(theme.palette.primary.main);

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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <IntlProvider
            messages={messageMap[locale]}
            locale={locale}
            defaultLocale="en"
          >
            <Container>
              <Navbar></Navbar>
              <Component {...pageProps} />
            </Container>
          </IntlProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </AuthContext.Provider>
  );
}
