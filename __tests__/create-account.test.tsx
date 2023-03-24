import { fireEvent, render, screen, cleanup } from "@testing-library/react";

import CreateAccount from "../pages/create-account";
import Login from "../pages/login";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../utilities/validators";
import * as englishMessages from "../lang/en.json";

import { IntlProvider } from "react-intl";
import Navbar from "../components/Navbar";
import { setUserId } from "firebase/analytics";
import { simulatedUser } from "../utilities/test_utils/sham-users";

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

// const simulateLogin = () => { // @TODO deleteMe
//   const mockLoginMethod = jest.fn((email: string, password: string) => {
//     const shamUser = {
//       uid: "ttf48LgEWDUfNtZc63AwjOL2drU2",
//       email: email,
//       emailVerified: false,
//       isAnonymous: false,
//       providerData: [
//         {
//           providerId: "password",
//           uid: "mark.aaron.fisher@gmail.com",
//           displayName: null,
//           email: email,
//           phoneNumber: null,
//           photoURL: null,
//         },
//       ],
//       stsTokenManager: {
//         refreshToken:
//           "APJWN8f8yYPFdNjjfskT5fzFVKMsYJUJYTPk59d2fFtY9ml1wFu-SrJKVym2lopIm3NI3meXBf6e32uwbSmxsmza8Sh4jeDhX8PQiZmH8qYQV9sxj3NtTrbNJcbXKXFRCR42bnP-1ECiuqmdc3WOE1TfBiBy5vzv09rJ9fOqPS9Oo4S-QlHfqlfOxmAjvaIHiAIHcuK7KA9wHluE9qKiSKndl5NCoATJWC32EXcLMy5-ssxsMWkvtZo",
//         accessToken:
//           "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYW5ub3RhdGUtdmlkZW8tYTg3ODMiLCJhdWQiOiJhbm5vdGF0ZS12aWRlby1hODc4MyIsImF1dGhfdGltZSI6MTY3Nzc5MDcwMSwidXNlcl9pZCI6InR0ZjQ4TGdFV0RVZk50WmM2M0F3ak9MMmRyVTIiLCJzdWIiOiJ0dGY0OExnRVdEVWZOdFpjNjNBd2pPTDJkclUyIiwiaWF0IjoxNjc3NzkwNzAxLCJleHAiOjE2Nzc3OTQzMDEsImVtYWlsIjoibWFyay5hYXJvbi5maXNoZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1hcmsuYWFyb24uZmlzaGVyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.uiHHGUXLNDWSU-F1tvVdDs9m0d3lvvuaLZ6vg7DJXJWrWq_HcoYGmFVwBrIVFjuy-87ju7sbz8W3otIT2khQQG75W8-eUYRMFmI9tCt-13J19sqAFbZw9qAyX2PJ0t7PD-OrSLcNhe5OW8MjfgjMn5RINfwBO4bKVnPBth4iSS0-MqRady7hoMn1FjXVvry0lGgYJM_iv_Lh79ztKgb68uAe_VuZTEa8fEShAAiMAXSA4MhgV0XQbd4vGVctnjVWwJjsvLxf_vmmvedksVqdWYL93pNVch1cD_uetvfy_I6cFroWy2bZMFL76GiNZm0MT2VEtU5KJGzOM3cvmTfUCA",
//         expirationTime: 1677794301373,
//       },
//       createdAt: "1673929897962",
//       lastLoginAt: "1677790701400",
//       apiKey: "AIzaSyAkyK0eEz1GLUoit_oGBPM97NVJUcrxz-o",
//       appName: "[DEFAULT]",
//     };
//     setUser(shamUser);
//   });
//   renderWithReactIntl(
//     locale,
//     messages,
//     <Login loginMethod={mockLoginMethod} />
//   );
//   const emailAddressEl: HTMLInputElement | null | undefined = screen
//     .queryByTestId("emailInput")
//     ?.querySelector("input");
//   expect(true).toBeTruthy();
//   if (emailAddressEl) {
//     fireEvent.change(emailAddressEl, {
//       target: { value: "validEmail@example.com" },
//     });
//   } else {
//     expect(true).toBeFalsy();
//   }
//   const passwordInputEl: HTMLInputElement | null | undefined = screen
//     .queryByTestId("passwordInput")
//     ?.querySelector("input");
//   if (passwordInputEl) {
//     fireEvent.change(passwordInputEl, {
//       target: { value: "validPassword1234" },
//     });
//   } else {
//     expect(true).toBeFalsy();
//   }
//   const loginButton: HTMLElement | null | undefined =
//     screen.queryByTestId("submit-button");
//   if (loginButton) {
//     fireEvent.click(loginButton);
//   } else {
//     expect(true).toBeFalsy();
//   }
// };

afterEach(cleanup);

jest.mock("next/router", () => require("next-router-mock"));

describe("In account creation,", () => {
  test("when email address input is untouched, there should be no error text about the email address", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
      messages["MUST_BE_VALID_EMAIL"]
    );
    expect(emailErrorEl).toBeNull();
  });
  test("when email address input is touched and is valid, there should not be error text about the email address", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
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
    renderWithReactIntl(locale, messages, <CreateAccount />);
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
  test("when password input is untouched, there should be no error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const passwordErrorEl: HTMLElement | null | undefined = screen.queryByText(
      messages["PASSWORD_MUST_CONTAIN"]
    );
    expect(passwordErrorEl).toBeNull();
  });
  test("when password input is touched and not valid length, there should be error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, { target: { value: "test12" } });
      expect(isValidPassword(passwordInputEl.value)).toBeFalsy();
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
      expect(passwordErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
    const passwordErrorEl: HTMLElement | null | undefined = screen.queryByText(
      messages["PASSWORD_MUST_CONTAIN"]
    );
    expect(passwordErrorEl).not.toBeNull();
  });
  test("when password input is touched and does not contain letters and numbers, there should be error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, { target: { value: "testing" } });
      expect(isValidPassword(passwordInputEl.value)).toBeFalsy();
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
      expect(passwordErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when password input is touched and contains number and letters and is of sufficient length, there should be no error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, {
        target: { value: "testing123" },
      });
      expect(isValidPassword(passwordInputEl.value)).toBeTruthy();
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
      expect(passwordErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when password input is touched and contains number and letters and special characters and is of sufficient length, there should be no error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, {
        target: { value: "testing123?!" },
      });
      expect(isValidPassword(passwordInputEl.value)).toBeTruthy();
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["PASSWORD_MUST_CONTAIN"]);
      expect(passwordErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when confirm password is touched and does not match password, which is valid, there should be error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    const confirmPasswordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("confirmPasswordInput")
      ?.querySelector("input");
    if (passwordInputEl && confirmPasswordInputEl) {
      fireEvent.change(passwordInputEl, {
        target: { value: "testing123" },
      });
      fireEvent.change(confirmPasswordInputEl, {
        target: { value: "testing456" },
      });
      const confirmPasswordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["PASSWORDS_MUST_BE_IDENTICAL"]);
      expect(confirmPasswordErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when confirm password is touched and does match password, which is valid, there should be no error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    const confirmPasswordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("confirmPasswordInput")
      ?.querySelector("input");
    if (passwordInputEl && confirmPasswordInputEl) {
      fireEvent.change(passwordInputEl, {
        target: { value: "testing123" },
      });
      fireEvent.change(confirmPasswordInputEl, {
        target: { value: "testing123" },
      });
      const confirmPasswordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["PASSWORDS_MUST_BE_IDENTICAL"]);
      expect(confirmPasswordErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when username is touched and contains nothing, there should be error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const userNameInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("usernameInput")
      ?.querySelector("input");
    if (userNameInputEl) {
      fireEvent.change(userNameInputEl, { target: { value: "a" } });
      fireEvent.change(userNameInputEl, { target: { value: "" } });
      expect(isValidUsername(userNameInputEl?.value)).toBeFalsy();
      const usernameErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["USERNAME_IS_REQUIRED"]);
      expect(usernameErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when username is touched and contains somthing, there should be no error text", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const userNameInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("usernameInput")
      ?.querySelector("input");
    if (userNameInputEl) {
      fireEvent.change(userNameInputEl, { target: { value: "a" } });
      expect(isValidUsername(userNameInputEl?.value)).toBeTruthy();
      const usernameErrorEl: HTMLElement | null | undefined =
        screen.queryByText(messages["USERNAME_IS_REQUIRED"]);
      expect(usernameErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("the submit button is disabled until all required fields have truthy values", () => {
    renderWithReactIntl(locale, messages, <CreateAccount />);
    const emailAddressInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("emailInput")
      ?.querySelector("input");
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    const confirmPasswordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("confirmPasswordInput")
      ?.querySelector("input");
    const userNameInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("usernameInput")
      ?.querySelector("input");
    const submitButton: HTMLElement | null | undefined =
      screen.queryByTestId("submit-button");
    expect(submitButton).not.toBeNull();

    expect(submitButton).toBeDisabled();

    if (
      emailAddressInputEl &&
      passwordInputEl &&
      confirmPasswordInputEl &&
      userNameInputEl
    ) {
      fireEvent.change(emailAddressInputEl, {
        target: { value: "test@example.com" },
      });
      fireEvent.change(passwordInputEl, { target: { value: "test123" } });
      fireEvent.change(confirmPasswordInputEl, {
        target: { value: "test123" },
      });
      fireEvent.change(userNameInputEl, { target: { value: "testUser" } });

      expect(submitButton).not.toBeNull();
      expect(submitButton).not.toBeDisabled();
    } else {
      expect(true).toBeFalsy();
    }
  });

  test("a user sees the login button on the create account page", () => {
    renderWithReactIntl(
      locale,
      messages,
      <>
        <Navbar />
        {/* <CreateAccount /> */}
      </>
    );
    const loginButtonEl: HTMLButtonElement | null =
      screen.queryByTestId("login-button");
    expect(loginButtonEl).not.toBeNull();
  });

  test("a user cannot create an account if they are logged in", () => {
    renderWithReactIntl(
      locale,
      messages,
      <CreateAccount user={simulatedUser} />
    );

    const emailAddressEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("emailInput")
      ?.querySelector("input");
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    const confirmPasswordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("confirmPasswordInput")
      ?.querySelector("input");
    const userNameInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("usernameInput")
      ?.querySelector("input");

    expect(emailAddressEl).toBeUndefined();
    expect(passwordInputEl).toBeUndefined();
    expect(confirmPasswordInputEl).toBeUndefined();
    expect(userNameInputEl).toBeUndefined();

    const notLoggedInWarningEl: HTMLElement | null | undefined =
      screen.queryByText(messages["MUST_LOG_OUT_FIRST"]);
    expect(notLoggedInWarningEl).not.toBeNull();
    expect(notLoggedInWarningEl).not.toBeUndefined();
  });
});
