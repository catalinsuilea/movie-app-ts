import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import Card from "../../../types-modules/Card";
import { BrowserRouter } from "react-router-dom";
test("test the rendering of the moviecard component", () => {
  render(
    <BrowserRouter>
      <MovieCard
        movie={{
          key: 111,
          imgSrc: "imageUrl",
          title: "Movie title",
          description: "Movie description",
          rating: 10,
          releaseDate: 2012,
          id: 112,
        }}
      />
    </BrowserRouter>
  );
  screen.debug();
  expect(screen.getByTestId("movie-card")).toBeInTheDocument();
});
