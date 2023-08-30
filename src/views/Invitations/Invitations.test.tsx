import React from "react";
import { render, screen } from "@testing-library/react";
import Invitations from "./Invitations";

test("renders learn react link", () => {
  render(<Invitations />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
