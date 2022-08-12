import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import GetGenres from "./GetGenres";

import axios from "axios";

jest.mock("axios");
describe("when API call is successful", () => {
  it("should return a movie card based on genre", async () => {
    const data = { genres: [{ id: 1, name: "Action" }] };
    const url =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US";
    axios.get.mockResolvedValue({ data });
    render(
      <BrowserRouter>
        <GetGenres />
      </BrowserRouter>
    );
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
    const resolvedLoading = await waitFor(() => screen.getByTestId("test"));
    expect(resolvedLoading).toHaveTextContent("Pick movies by genre!");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});
