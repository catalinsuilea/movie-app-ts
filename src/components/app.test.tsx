import { render, screen, cleanup } from "@testing-library/react";

import MovieCard from "../MovieCard";
// import WelcomePage from "../WelcomePage";
// test("should see Discover", () => {
//   render(<WelcomePage />);
//   const element = screen.getByTestId("h1Id");

//   expect(element).toBeInTheDocument();
// });

import GetMovies from "../GetMovies";
import GetGenres from "../GetGenres";
test("should render cards", () => {
  render(<GetGenres />);

  const element = screen.getByTestId("genres-id");

  expect(element).toBeInTheDocument();
});
