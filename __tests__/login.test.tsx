import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import Login from "../pages/login";
import * as englishMessages from "../lang/en.json";

import { IntlProvider } from "react-intl";

const messageMap: {} = {
  en: englishMessages,
};
const locale: string = "en";
const messages: Record<string, string> = messageMap[locale as keyof {}];

const renderWithReactIntl = (
  locale: string,
  messages: Record<string, string>,
  component: React.ReactNode
) => {
  return render(
    <IntlProvider locale={locale} messages={messages}>
      {component}
    </IntlProvider>
  );
};

afterEach(cleanup);

describe("When logging in,", () => {
  test("a user can't successfully log in if their email isn't verified", () => {
    renderWithReactIntl(locale, messages, <Login />);
    expect(true).toBeFalsy();
    // const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
    //   messages["MUST_BE_VALID_EMAIL"]
    // );
    // expect(emailErrorEl).toBeNull();
  });
});
