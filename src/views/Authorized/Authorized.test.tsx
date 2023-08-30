import React from "react";
import { render, screen } from "@testing-library/react";
import Authorized from "./Authorized";

test("renders learn react link", () => {
  render(<Authorized />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
