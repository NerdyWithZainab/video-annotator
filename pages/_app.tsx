import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@mui/material";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../keys";

export default function App({ Component, pageProps }: AppProps) {
  const messageMap = {
    en: englishMessages,
  };
  const locale = "en";

  // const app = initializeApp(firebaseConfig);

  // const configData: {
  //   apiKey: string;
  //   authDomain: string;
  //   projectId: string;
  //   storageBucket: string;
  //   messagingSenderId: string;
  //   appId: string;
  //   measurementId: string;
  // } = firebaseConfig;
  const configData:
    | {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
      }
    | undefined = {
    apiKey: process?.env?.apiKey || "",
    authDomain: process?.env?.authDomain || "",
    projectId: process?.env?.projectId || "",
    storageBucket: process?.env?.storageBucket || "",
    messagingSenderId: process?.env?.messagingSenderId || "",
    appId: process?.env?.appId || "",
    measurementId: process?.env?.measurementId || "",
  };
  if (configData?.apiKey) {
    // @TODO flesh out with a more robust checker of non-emptiness
    const app = initializeApp(configData);
    if (app.name && typeof window !== "undefined") {
      const analytics = getAnalytics(app);
    }
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
