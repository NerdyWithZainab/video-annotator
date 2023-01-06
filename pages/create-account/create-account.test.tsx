import { render, screen } from "@testing-library/react";
import CreateAccount from "./create-account";

describe("Account creation", () => {
  test("is successful with valid inputs", () => {
    render(<CreateAccount />);
    const deleteMeEl = screen.getByText("Hi There", { exact: false });
    expect(deleteMeEl).not.toBeInTheDocument();
  });
});
