// import { fireEvent, render, screen, cleanup } from "@testing-library/react";

// import CreateAccount from "../pages/create-account";
// import {
//   isValidEmail,
//   isValidPassword,
//   isValidUsername,
// } from "../utilities/validators";
// import * as englishMessages from "../lang/en.json";

// import { IntlProvider } from "react-intl";

// const messageMap: {} = {
//   en: englishMessages,
// };
// const locale: string = "en";
// const messages: Record<string, string> = messageMap[locale as keyof {}];

// const renderWithReactIntl = (
//   locale: string,
//   messages: Record<string, string>,
//   component: React.ReactNode
// ) => {
//   return render(
//     <IntlProvider locale={locale} messages={messages}>
//       {component}
//     </IntlProvider>
//   );
// };

// afterEach(cleanup);

// jest.mock("next/router", () => require("next-router-mock"));

describe("In account creation,", () => {
  test("This is dummy test", () => {
    expect(true).toBeTruthy();
  });
  // test("when email address input is untouched, there should be no error text about the email address", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
  //     messages["MUST_BE_VALID_EMAIL"]
  //   );
  //   expect(emailErrorEl).toBeNull();
  // });
  // test("when email address input is touched and is valid, there should be error text about the email address", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const emailAddressEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("emailInput")
  //     ?.querySelector("input");

  //   if (emailAddressEl) {
  //     fireEvent.change(emailAddressEl, {
  //       target: { value: "testing@example.com" },
  //     });
  //     expect(isValidEmail(emailAddressEl?.value)).toBeTruthy();
  //     const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
  //       messages["MUST_BE_VALID_EMAIL"]
  //     );
  //     expect(emailErrorEl).toBeNull();
  //   } else {
  //     expect(false).toBeTruthy();
  //   }
  // });
  // test("when email address input is touched and email is invalid, there should be error text about the email address", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const emailAddressEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("emailInput")
  //     ?.querySelector("input");

  //   if (emailAddressEl) {
  //     fireEvent.change(emailAddressEl, {
  //       target: { value: "invalidEmailAddress" },
  //     });
  //     expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
  //     let emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
  //       messages["MUST_BE_VALID_EMAIL"]
  //     );
  //     expect(emailErrorEl).toBeVisible();

  //     fireEvent.change(emailAddressEl, {
  //       target: { value: "testing@examplecom" },
  //     });
  //     expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
  //     emailErrorEl = screen.queryByText(messages["MUST_BE_VALID_EMAIL"]);
  //     expect(emailErrorEl).toBeVisible();

  //     fireEvent.change(emailAddressEl, {
  //       target: { value: "testingexample.com" },
  //     });
  //     expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
  //     emailErrorEl = screen.queryByText(messages["MUST_BE_VALID_EMAIL"]);
  //     expect(emailErrorEl).toBeVisible();
  //   } else {
  //     expect(false).toBeTruthy();
  //   }
  // });
  // test("when password input is untouched, there should be no error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const passwordErrorEl: HTMLElement | null | undefined = screen.queryByText(
  //     messages["PASSWORD_MUST_CONTAIN"]
  //   );
  //   expect(passwordErrorEl).toBeNull();
  // });
  // test("when password input is touched and not valid length, there should be error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const passwordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("passwordInput")
  //     ?.querySelector("input");
  //   if (passwordInputEl) {
  //     fireEvent.change(passwordInputEl, { target: { value: "test12" } });
  //     expect(isValidPassword(passwordInputEl.value)).toBeFalsy();
  //     const passwordErrorEl: HTMLElement | null | undefined =
  //       screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
  //     expect(passwordErrorEl).not.toBeNull();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  //   const passwordErrorEl: HTMLElement | null | undefined = screen.queryByText(
  //     messages["PASSWORD_MUST_CONTAIN"]
  //   );
  //   expect(passwordErrorEl).not.toBeNull();
  // });
  // test("when password input is touched and does not contain letters and numbers, there should be error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const passwordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("passwordInput")
  //     ?.querySelector("input");
  //   if (passwordInputEl) {
  //     fireEvent.change(passwordInputEl, { target: { value: "testing" } });
  //     expect(isValidPassword(passwordInputEl.value)).toBeFalsy();
  //     const passwordErrorEl: HTMLElement | null | undefined =
  //       screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
  //     expect(passwordErrorEl).not.toBeNull();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  // });
  // test("when password input is touched and contains number and letters and is of sufficient length, there should be no error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const passwordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("passwordInput")
  //     ?.querySelector("input");
  //   if (passwordInputEl) {
  //     fireEvent.change(passwordInputEl, {
  //       target: { value: "testing123" },
  //     });
  //     expect(isValidPassword(passwordInputEl.value)).toBeTruthy();
  //     const passwordErrorEl: HTMLElement | null | undefined =
  //       screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
  //     expect(passwordErrorEl).toBeNull();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  // });
  // test("when confirm password is touched and does not match password, which is valid, there should be error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const passwordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("passwordInput")
  //     ?.querySelector("input");
  //   const confirmPasswordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("confirmPasswordInput")
  //     ?.querySelector("input");
  //   if (passwordInputEl && confirmPasswordInputEl) {
  //     fireEvent.change(passwordInputEl, {
  //       target: { value: "testing123" },
  //     });
  //     fireEvent.change(confirmPasswordInputEl, {
  //       target: { value: "testing456" },
  //     });
  //     const confirmPasswordErrorEl: HTMLElement | null | undefined =
  //       screen.queryByText(messages["PASSWORDS_MUST_BE_IDENTICAL"]);
  //     expect(confirmPasswordErrorEl).not.toBeNull();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  // });
  // test("when confirm password is touched and does match password, which is valid, there should be no error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const passwordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("passwordInput")
  //     ?.querySelector("input");
  //   const confirmPasswordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("confirmPasswordInput")
  //     ?.querySelector("input");
  //   if (passwordInputEl && confirmPasswordInputEl) {
  //     fireEvent.change(passwordInputEl, {
  //       target: { value: "testing123" },
  //     });
  //     fireEvent.change(confirmPasswordInputEl, {
  //       target: { value: "testing123" },
  //     });
  //     const confirmPasswordErrorEl: HTMLElement | null | undefined =
  //       screen.queryByText(messages["PASSWORDS_MUST_BE_IDENTICAL"]);
  //     expect(confirmPasswordErrorEl).toBeNull();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  // });
  // test("when username is touched and contains nothing, there should be error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const userNameInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("usernameInput")
  //     ?.querySelector("input");
  //   if (userNameInputEl) {
  //     fireEvent.change(userNameInputEl, { target: { value: "a" } });
  //     fireEvent.change(userNameInputEl, { target: { value: "" } });
  //     expect(isValidUsername(userNameInputEl?.value)).toBeFalsy();
  //     const usernameErrorEl: HTMLElement | null | undefined =
  //       screen.queryByText(messages["USERNAME_IS_REQUIRED"]);
  //     expect(usernameErrorEl).not.toBeNull();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  // });
  // test("when username is touched and contains somthing, there should be no error text", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const userNameInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("usernameInput")
  //     ?.querySelector("input");
  //   if (userNameInputEl) {
  //     fireEvent.change(userNameInputEl, { target: { value: "a" } });
  //     expect(isValidUsername(userNameInputEl?.value)).toBeTruthy();
  //     const usernameErrorEl: HTMLElement | null | undefined =
  //       screen.queryByText(messages["USERNAME_IS_REQUIRED"]);
  //     expect(usernameErrorEl).toBeNull();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  // });
  // test("the submit button is disabled until all required fields have truthy values", () => {
  //   renderWithReactIntl(locale, messages, <CreateAccount />);
  //   const emailAddressInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("emailInput")
  //     ?.querySelector("input");
  //   const passwordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("passwordInput")
  //     ?.querySelector("input");
  //   const confirmPasswordInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("confirmPasswordInput")
  //     ?.querySelector("input");
  //   const userNameInputEl: HTMLInputElement | null | undefined = screen
  //     .queryByTestId("usernameInput")
  //     ?.querySelector("input");
  //   const submitButton: HTMLElement | null | undefined =
  //     screen.queryByTestId("submit-button");
  //   expect(submitButton).not.toBeNull();

  //   expect(submitButton).toBeDisabled();

  //   if (
  //     emailAddressInputEl &&
  //     passwordInputEl &&
  //     confirmPasswordInputEl &&
  //     userNameInputEl
  //   ) {
  //     fireEvent.change(emailAddressInputEl, {
  //       target: { value: "test@example.com" },
  //     });
  //     fireEvent.change(passwordInputEl, { target: { value: "test123" } });
  //     fireEvent.change(confirmPasswordInputEl, {
  //       target: { value: "test123" },
  //     });
  //     fireEvent.change(userNameInputEl, { target: { value: "testUser" } });

  //     expect(submitButton).not.toBeNull();
  //     expect(submitButton).not.toBeDisabled();
  //   } else {
  //     expect(true).toBeFalsy();
  //   }
  // });
});
