import { Route, Routes } from "react-router-dom";
import "./App.css";
import GetMovies from "../GetMovies/GetMovies";
import MovieDetails from "../MovieDetails/MovieDetails";
import GetGenres from "../GetGenres/GetGenres";
import WelcomePage from "../WelcomePage/WelcomePage";
import { ChakraProvider } from "@chakra-ui/react";
import Popularity from "../Popularity/Popularity";
import { myNewTheme } from "../../../styles/theme";
import SearchMovie from "../SearchMovie/SearchMovie";
import { createContext } from "react";
import { useState } from "react";
export const MovieNameContext = createContext("");
function App() {
  const [movieTitle, setMovieTitle] = useState("");
  // console.log(movieTitle);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ChakraProvider theme={myNewTheme}>
              <WelcomePage setMovieTitle={setMovieTitle} />
            </ChakraProvider>
          }
        >
          <Route
            path="/movie/:value"
            element={
              <MovieNameContext.Provider value={movieTitle}>
                <SearchMovie />
              </MovieNameContext.Provider>
            }
          ></Route>
          <Route path="/top-rated-movies" element={<Popularity />}>
            <Route
              path="/top-rated-movies/page=:page"
              element={<Popularity />}
            />
          </Route>
          <Route path="genres" element={<GetGenres />}>
            <Route path="movies/:genreName/:genreID" element={<GetMovies />} />
          </Route>
        </Route>

        <Route path="/:movieName/:id" element={<MovieDetails />}></Route>
      </Routes>
    </div>
  );
}
export default App;
