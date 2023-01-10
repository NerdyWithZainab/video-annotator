import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import CreateAccount from "../pages/create-account";
import { isValidEmail } from "../utilities/validators";

afterEach(cleanup);

describe("Account creation", () => {
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
      expect(emailErrorEl).not.toBeNull();

      fireEvent.change(emailAddressEl, {
        target: { value: "testing@examplecom" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      emailErrorEl = screen.queryByText("Must be a valid email address");
      expect(emailErrorEl).not.toBeNull();

      fireEvent.change(emailAddressEl, {
        target: { value: "testingexample.com" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsy();
      emailErrorEl = screen.queryByText("Must be a valid email address");
      expect(emailErrorEl).not.toBeNull();
    } else {
      expect(false).toBeTruthy();
    }
  });
  test("when password input is touched and not valid lenght", () => {});
  test("when password input is touched and does not contain letters and numbers", () => {});
  test("when confirm password is touched and does not match password, which is valid", () => {});
});
