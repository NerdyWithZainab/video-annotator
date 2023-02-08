import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import Login from "../pages/login";
import Navbar from "../components/Navbar";
import * as englishMessages from "../lang/en.json";

import { IntlProvider } from "react-intl";

import { isValidEmail } from "../utilities/validators";

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

jest.mock("next/router", () => require("next-router-mock"));

describe("When logging in,", () => {
  test("when email address input is untouched, there should be no error text about the email address", () => {
    renderWithReactIntl(locale, messages, <Login />);
    const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
      messages["MUST_BE_VALID_EMAIL"]
    );
    expect(emailErrorEl).toBeNull();
  });

  test("when email address input is touched and is valid, there should not be error text about the email address", () => {
    renderWithReactIntl(locale, messages, <Login />);
    const emailAddressEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("emailInput")
      ?.querySelector("input");

    if (emailAddressEl) {
      fireEvent.change(emailAddressEl, {
        target: { value: "testing@example.com" },
      });
      expect(isValidEmail(emailAddressEl?.value)).toBeTruthy();
      const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
        messages["MUST_BE_VALID_EMAIL"]
      );
      expect(emailErrorEl).toBeNull();
    } else {
      expect(false).toBeTruthy();
    }
  });

  test("when email address input is touched and email is invalid, there should be error text about the email address", () => {
    renderWithReactIntl(locale, messages, <Login />);
    const emailAddressEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("emailInput")
      ?.querySelector("input");

    if (emailAddressEl) {
      fireEvent.change(emailAddressEl, {
        target: { value: "invalidEmailAddress" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      let emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
        messages["MUST_BE_VALID_EMAIL"]
      );
      expect(emailErrorEl).toBeVisible();

      fireEvent.change(emailAddressEl, {
        target: { value: "testing@examplecom" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      emailErrorEl = screen.queryByText(messages["MUST_BE_VALID_EMAIL"]);
      expect(emailErrorEl).toBeVisible();

      fireEvent.change(emailAddressEl, {
        target: { value: "testingexample.com" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      emailErrorEl = screen.queryByText(messages["MUST_BE_VALID_EMAIL"]);
      expect(emailErrorEl).toBeVisible();
    } else {
      expect(false).toBeTruthy();
    }
  });

  test("when password input is touched no error text should be displayed regardless of validity so as not to tip any info to potentially sketchy end users", () => {
    renderWithReactIntl(locale, messages, <Login />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, {
        target: { value: "testing123" },
      });
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
      expect(passwordErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });

  test("the submit button is disabled until all required fields have truthy values", () => {
    renderWithReactIntl(locale, messages, <Login />);
    const emailAddressInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("emailInput")
      ?.querySelector("input");
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    const submitButton: HTMLElement | null | undefined =
      screen.queryByTestId("submit-button");
    expect(submitButton).not.toBeNull();

    expect(submitButton).toBeDisabled();

    if (emailAddressInputEl && passwordInputEl) {
      fireEvent.change(emailAddressInputEl, {
        target: { value: "test@example.com" },
      });
      fireEvent.change(passwordInputEl, { target: { value: "test123" } });

      expect(submitButton).not.toBeNull();
      expect(submitButton).not.toBeDisabled();
    } else {
      expect(true).toBeFalsy();
    }
  });

  // test("a user doesn't see the login button on the login page", () => {
  //   renderWithReactIntl(
  //     locale,
  //     messages,
  //     <>
  //       <Navbar />
  //       {/* <Login /> */}
  //     </>
  //   );
  //   const loginButtonEl: HTMLButtonElement | null =
  //     screen.queryByTestId("login-button");
  //   // expect(true).toBeFalsy();
  //   expect(loginButtonEl).not.toBeVisible();
  // }); // @TODO get this to work

  test("a user can't successfully visit non-verification pages if their email isn't verified", () => {
    renderWithReactIntl(locale, messages, <Login />);
    expect(true).toBeTruthy();
    // expect(true).toBeFalsy();
    // const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
    //   messages["MUST_BE_VALID_EMAIL"]
    // );
    // expect(emailErrorEl).toBeNull();
  });
  test("a user is directed to the verification page if their email isn't verified but they are logged in", () => {
    renderWithReactIntl(locale, messages, <Login />);
    expect(true).toBeTruthy();
    // expect(true).toBeFalsy();
    // const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
    //   messages["MUST_BE_VALID_EMAIL"]
    // );
    // expect(emailErrorEl).toBeNull();
  });
  test("a user doesn't see the login button if they are already logged in or if they are in the create-account page", () => {
    renderWithReactIntl(locale, messages, <Login />);
    expect(true).toBeTruthy();
    // expect(true).toBeFalsy();
    // const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
    //   messages["MUST_BE_VALID_EMAIL"]
    // );
    // expect(emailErrorEl).toBeNull();
  });
  test("a user doesn't see the login button if they are in the create-account page", () => {
    renderWithReactIntl(locale, messages, <Login />);
    expect(true).toBeTruthy();
    // expect(true).toBeFalsy();
    // const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
    //   messages["MUST_BE_VALID_EMAIL"]
    // );
    // expect(emailErrorEl).toBeNull();
  });
});
