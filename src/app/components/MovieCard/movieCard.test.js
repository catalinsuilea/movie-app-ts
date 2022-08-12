import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import Card from "../../../types-modules/Card";
import { BrowserRouter } from "react-router-dom";
import Loader from "../Loader/Loader";

describe("MovieCard", () => {
  // beforeAll(() => {
  //   jest.useFakeTimers();
  // });

  // afterAll(() => {
  //   jest.useRealTimers();
  // });
  it("should render a movie card", () => {
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
  // it("should render a Loader for one second", async () => {
  //   screen.debug();
  //   expect(screen.getByTestId("loader")).toBeInTheDocument();
  //   jest.advanceTimersByTime(1100);
  //   screen;
  //   expect(screen.getByTestId("loader")).not.toBeInTheDocument();
  // });
});
