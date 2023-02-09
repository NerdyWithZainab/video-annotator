import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import * as englishMessages from "../lang/en.json";
import { IntlProvider } from "react-intl";

const locale: string = "en";
const messageMap: {} = {
  en: englishMessages,
};
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

// jest.mock("next/router", () => require("next-router-mock"));

describe("In @TODO,", () => {
  test("@TODO delete this one", () => {
    expect(true).toBeTruthy();
  });
  //   test("cannot access this page if email is not verified or user not logged in", () => {
  //     //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //     //   const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
  //     //     messages["MUST_BE_VALID_EMAIL"]
  //     //   );
  //     //   expect(emailErrorEl).toBeNull();
  //   });
});
