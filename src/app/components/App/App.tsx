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
import CarouselComponent from "../Carousel/carousel";
import SignUp from "../SignUp/signup";
import SearchBar from "../WelcomePage/searchBar";
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
              <>
                <WelcomePage />
              </>
            </ChakraProvider>
          }
        >
          <Route path="/movie/:value" element={<SearchMovie />}></Route>
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
        <Route
          path="/signup"
          element={
            <ChakraProvider>
              {" "}
              <SignUp />
            </ChakraProvider>
          }
        >
          {" "}
        </Route>
      </Routes>
    </div>
  );
}
export default App;
