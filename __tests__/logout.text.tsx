import { fireEvent, render, screen, cleanup } from "@testing-library/react";

// import CreateAccount from "../pages/create-account";
// import {
//   isValidEmail,
//   isValidPassword,
//   isValidUsername,
// } from "../utilities/validators";
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

// jest.mock("next/router", () => require("next-router-mock"));

describe("In logout,", () => {
  test("I only see logout if I'm logged in", () => {
    expect(true).toBeTruthy();
  });

  test("I am taken to the login page upon logout", () => {
    expect(true).toBeTruthy();
  });

  //   test("I can't visit my user profile page or the annotation page if I'm logged", () => {
  //     expect(true).toBeTruthy();
  //   }); // @TODO add this after you add some of the other pages

  // test("when email address input is untouched, there should be no error text about the email address", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
  //     messages["MUST_BE_VALID_EMAIL"]
  //   );
  //   expect(emailErrorEl).toBeNull();
  // });
});
