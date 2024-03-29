import { Route, Routes } from "react-router-dom";
import "./App.css";
import GetMovies from "../GetMovies/GetMovies";
import MovieDetails from "../MovieDetails/MovieDetails";
import GetGenres from "../GetGenres/GetGenres";
import WelcomePage from "../WelcomePage/WelcomePage";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Popularity from "../Popularity/Popularity";
import { myNewTheme } from "../../../styles/theme";
import SearchMovie from "../SearchMovie/SearchMovie";
import { createContext } from "react";
import SignUp from "../SignUp/signup";
import { SignInFormComponent } from "../SignUp/SignInFormComponent";
import { AuthProvider } from "../../contexts/AuthenticationContext";
import { DeviceTypeProvider } from "../../contexts/useDeviceTypeContext";
import Header from "../Header/Header";
import { Footer } from "./Footer";
import { FavouritesPage } from "../Favourites/Favourites";
import { FavouritesContextProvider } from "../../contexts/useFavouritesContext";

function App() {
  return (
    <ChakraProvider theme={myNewTheme}>
      <DeviceTypeProvider>
        <AuthProvider>
          <FavouritesContextProvider>
            <Header />
            <Routes>
              <Route path="/movie-app-ts" element={<WelcomePage />}>
                <Route path="movie/:value" element={<SearchMovie />}></Route>
                <Route path="top-rated-movies" element={<Popularity />}>
                  <Route
                    path="/movie-app-ts/top-rated-movies/page=:page"
                    element={<Popularity />}
                  />
                </Route>
                <Route path="genres/" element={<GetGenres />}>
                  <Route
                    path="movies/:genreName/:genreID"
                    element={<GetMovies />}
                  />
                </Route>
              </Route>
              <Route path="/:movieName/:id" element={<MovieDetails />}></Route>
              <Route path="/signIn" element={<SignInFormComponent />}></Route>
              <Route path="/signUp" element={<SignUp />}></Route>
              <Route path="/favourites" element={<FavouritesPage />}></Route>
            </Routes>
            <Footer />
          </FavouritesContextProvider>
        </AuthProvider>
      </DeviceTypeProvider>
    </ChakraProvider>
  );
}
export default App;
