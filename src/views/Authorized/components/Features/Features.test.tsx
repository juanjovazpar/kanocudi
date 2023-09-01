import React from "react";
import { render, screen } from "@testing-library/react";
import Features from "./Features";

test("renders learn react link", () => {
  render(<Features />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
