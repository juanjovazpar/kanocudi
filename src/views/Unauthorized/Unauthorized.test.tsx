import React from "react";
import { render, screen } from "@testing-library/react";
import Unauthorized from "./Unauthorized";

test("renders learn react link", () => {
  render(<Unauthorized />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
