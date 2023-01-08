import { fireEvent, render, screen } from "@testing-library/react";
import CreateAccount from "../pages/create-account";

describe("Account creation", () => {
  test("is successful with valid inputs", () => {
    render(<CreateAccount />);
    const emailAddressEl = screen.getByLabelText("Email", { exact: false });
    console.log("deleteMe emailAddressEl is: ");
    console.log(emailAddressEl);
    const passwordEl = screen.getByLabelText("Password", { exact: false });
    const confirmPasswordEl = screen.getByLabelText("Confirm Password", {
      exact: true,
    });
    const usernameEl = screen.getByLabelText("Username", { exact: false });
    fireEvent.change(emailAddressEl, {
      target: { value: "testing@example.com" },
    });
    fireEvent.change(passwordEl, { target: { value: "password1234567" } });
    fireEvent.change(confirmPasswordEl, {
      target: { value: "password1234567" },
    });
    fireEvent.change(usernameEl, { target: { value: "testUser1" } });
    const errorEls = screen.queryByRole("error", { exact: false });
    expect(errorEls).not.toBeVisible();

    // expect(deleteMeEl).not.toBeInTheDocument();
  });
});
