import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@mui/material";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { firebaseConfig } from "../keys";

export default function App({ Component, pageProps }: AppProps) {
  const messageMap = {
    en: englishMessages,
  };
  const locale = "en";

  // const app = initializeApp(firebaseConfig);

  const app = initializeApp(process?.env?.firebaseConfig);
  if (app.name && typeof window !== "undefined") {
    const analytics = getAnalytics(app);
  }

  return (
    <IntlProvider
      messages={messageMap[locale]}
      locale={locale}
      defaultLocale="en"
    >
      <Container>
        <Component {...pageProps} />
      </Container>
    </IntlProvider>
  );
}
