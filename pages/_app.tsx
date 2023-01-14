import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "@mui/material";
import { IntlProvider } from "react-intl";
import * as englishMessages from "../lang/en.json";

export default function App({ Component, pageProps }: AppProps) {
  const messageMap = {
    en: englishMessages,
  };
  const locale = "en";

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
