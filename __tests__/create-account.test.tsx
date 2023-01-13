import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import CreateAccount from "../pages/create-account";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../utilities/validators";

afterEach(cleanup);

describe("In account creation,", () => {
  test("when email address input is untouched, there should be no error text about the email address", () => {
    render(<CreateAccount />);
    const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
      "Must be a valid email address"
    );
    expect(emailErrorEl).toBeNull();
  });
  test("when email address input is touched and is valid, there should be error text about the email address", () => {
    render(<CreateAccount />);
    const emailAddressEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("emailInput")
      ?.querySelector("input");

    if (emailAddressEl) {
      fireEvent.change(emailAddressEl, {
        target: { value: "testing@example.com" },
      });
      expect(isValidEmail(emailAddressEl?.value)).toBeTruthy();
      const emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
        "Must be a valid email address"
      );
      expect(emailErrorEl).toBeNull();
    } else {
      expect(false).toBeTruthy();
    }
  });
  test("when email address input is touched and email is invalid, there should be error text about the email address", () => {
    render(<CreateAccount />);
    const emailAddressEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("emailInput")
      ?.querySelector("input");

    if (emailAddressEl) {
      fireEvent.change(emailAddressEl, {
        target: { value: "invalidEmailAddress" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      let emailErrorEl: HTMLElement | null | undefined = screen.queryByText(
        "Must be a valid email address"
      );
      expect(emailErrorEl).toBeVisible();

      fireEvent.change(emailAddressEl, {
        target: { value: "testing@examplecom" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      emailErrorEl = screen.queryByText("Must be a valid email address");
      expect(emailErrorEl).toBeVisible();

      fireEvent.change(emailAddressEl, {
        target: { value: "testingexample.com" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      emailErrorEl = screen.queryByText("Must be a valid email address");
      expect(emailErrorEl).toBeVisible();
    } else {
      expect(false).toBeTruthy();
    }
  });
  test("when password input is untouched, there should be no error text", () => {
    render(<CreateAccount />);
    const passwordErrorEl: HTMLElement | null | undefined = screen.queryByText(
      "Password must be seven characters long and contain both letters and numbers"
    );
    expect(passwordErrorEl).toBeNull();
  });
  test("when password input is touched and not valid length, there should be error text", () => {
    render(<CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, { target: { value: "test12" } });
      expect(isValidPassword(passwordInputEl.value)).toBeFalsy();
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(
          "Password must be seven characters long and contain both letters and numbers"
        );
      expect(passwordErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
    const passwordErrorEl: HTMLElement | null | undefined = screen.queryByText(
      "Password must be seven characters long and contain both letters and numbers"
    );
    expect(passwordErrorEl).not.toBeNull();
  });
  test("when password input is touched and does not contain letters and numbers, there should be error text", () => {
    render(<CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, { target: { value: "testing" } });
      expect(isValidPassword(passwordInputEl.value)).toBeFalsy();
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(
          "Password must be seven characters long and contain both letters and numbers"
        );
      expect(passwordErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when password input is touched and contains number and letters and is of sufficient length, there should be no error text", () => {
    render(<CreateAccount />);
    const passwordInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("passwordInput")
      ?.querySelector("input");
    if (passwordInputEl) {
      fireEvent.change(passwordInputEl, {
        target: { value: "testing123" },
      });
      expect(isValidPassword(passwordInputEl.value)).toBeTruthy();
      const passwordErrorEl: HTMLElement | null | undefined =
        screen.queryByText(
          "Password must be seven characters long and contain both letters and numbers"
        );
      expect(passwordErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when confirm password is touched and does not match password, which is valid, there should be error text", () => {
    render(<CreateAccount />);
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
        screen.queryByText("Passwords must be identical");
      expect(confirmPasswordErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when confirm password is touched and does match password, which is valid, there should be no error text", () => {
    render(<CreateAccount />);
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
        screen.queryByText("Passwords must be identical");
      expect(confirmPasswordErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when username is touched and contains nothing, there should be error text", () => {
    render(<CreateAccount />);
    const userNameInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("usernameInput")
      ?.querySelector("input");
    if (userNameInputEl) {
      fireEvent.change(userNameInputEl, { target: { value: "a" } });
      fireEvent.change(userNameInputEl, { target: { value: "" } });
      expect(isValidUsername(userNameInputEl?.value)).toBeFalsy();
      const usernameErrorEl: HTMLElement | null | undefined =
        screen.queryByText("Username is required");
      expect(usernameErrorEl).not.toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("when username is touched and contains somthing, there should be no error text", () => {
    render(<CreateAccount />);
    const userNameInputEl: HTMLInputElement | null | undefined = screen
      .queryByTestId("usernameInput")
      ?.querySelector("input");
    if (userNameInputEl) {
      fireEvent.change(userNameInputEl, { target: { value: "a" } });
      expect(isValidUsername(userNameInputEl?.value)).toBeTruthy();
      const usernameErrorEl: HTMLElement | null | undefined =
        screen.queryByText("Username is required");
      expect(usernameErrorEl).toBeNull();
    } else {
      expect(true).toBeFalsy();
    }
  });
  test("the submit button is disabled until all required fields have truthy values", () => {
    render(<CreateAccount />);
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
    const submitButton: HTMLElement | null | undefined =
      screen.queryByTestId("submit-button");
    expect(submitButton).not.toBeNull();

    expect(submitButton).toBeDisabled();
  });
});
