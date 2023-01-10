import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import CreateAccount from "../pages/create-account";
import { isValidEmail } from "../utilities/validators";

afterEach(cleanup);

describe("Account creation", () => {
  test("when email address input is touched and not valid email, there should be error text about the email address", () => {
    render(<CreateAccount />);
    const emailAddressEl = screen
      .queryByTestId("testing")
      ?.querySelector("input");

    if (emailAddressEl) {
      fireEvent.change(emailAddressEl, {
        target: { value: "testing@example.com" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeTruthy();
    } else {
      expect(false).toBeTruthy();
    }
    // const passwordEl = screen.getByText("Password", { exact: true });
    // const confirmPasswordEl = screen.getByText("Confirm Password", {
    //   exact: true,
    // });
    // const usernameEl = screen.getByText("Username", { exact: false });
    // fireEvent.change(passwordEl, { target: { value: "password1234567" } });
    // fireEvent.change(confirmPasswordEl, {
    //   target: { value: "password1234567" },
    // });
    // fireEvent.change(usernameEl, { target: { value: "testUser1" } });
    // const errorEls = screen.queryByRole("error", { exact: false });
    // expect(errorEls).not.toBeVisible();

    // expect(deleteMeEl).not.toBeInTheDocument();
  });
  test("when email address input is touched and email is valid, there should be no error text about the email address", () => {
    render(<CreateAccount />);
    const emailAddressEl = screen
      .queryByTestId("testing")
      ?.querySelector("input");

    if (emailAddressEl) {
      fireEvent.change(emailAddressEl, {
        target: { value: "testing@examplecom" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsey();
      fireEvent.change(emailAddressEl, {
        target: { value: "testing@example.com.com" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsey();
      fireEvent.change(emailAddressEl, {
        target: { value: "testingexample.com" },
      });
      expect(isValidEmail(emailAddressEl.value)).toBeFalsey();
    } else {
      expect(false).toBeTruthy();
    }
  });
  test("when password input is touched and not valid lenght", () => {});
  test("when password input is touched and does not contain letters and numbers", () => {});
  test("when confirm password is touched and does not match password, which is valid", () => {});
});
