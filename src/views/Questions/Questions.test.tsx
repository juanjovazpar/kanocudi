import React from "react";
import { render, screen } from "@testing-library/react";
import Questions from "./Questions";

test("renders learn react link", () => {
  render(<Questions />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
