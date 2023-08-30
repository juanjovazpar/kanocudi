import React from "react";
import { render, screen } from "@testing-library/react";
import ForgotPassword from "./ForgotPassword";

test("renders learn react link", () => {
  render(<ForgotPassword />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
