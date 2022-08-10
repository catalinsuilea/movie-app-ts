import { render, screen } from "@testing-library/react";
import GetGenres from "./GetGenres";
import Routes, { BrowserRouter } from "react-router-dom";
test("render of get genres", () => {
  render(
    <BrowserRouter>
      <GetGenres />
    </BrowserRouter>
  );
  const element = screen.getByTestId("genres-id");
  expect(element).toBeInTheDocument();
});
