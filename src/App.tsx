import { Route, Routes } from "react-router-dom";
import "./App.css";
import GetMovies from "./GetMovies";
import MovieDetails from "./MovieDetails";
import GetGenres from "./GetGenres";
import WelcomePage from "./WelcomePage";
import { ChakraProvider } from "@chakra-ui/react";
import Popularity from "./Popularity";
import { myNewTheme } from "./styles/theme";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ChakraProvider>
              {" "}
              <WelcomePage />
            </ChakraProvider>
          }
        >
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
