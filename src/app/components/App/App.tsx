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
import SignUp from "../SignUp/signup";
import { SignInFormComponent } from "../SignUp/SignInFormComponent";
import { AuthProvider } from "../../contexts/AuthenticationContext";
import { DeviceTypeProvider } from "../../contexts/useDeviceTypeContext";
import Header from "../Header/Header";
import { Footer } from "./Footer";
import { FavouritesPage } from "../Favourites/Favourites";
import { FavouritesContextProvider } from "../../contexts/useFavouritesContext";
import { PrivateRoute } from "../ProtectedRoute";
import { PersonDetails } from "../MovieDetails/PersonDetails";
import { EpisodeDetails } from "../TVShowDetails/EpisodeDetails";
import { MediaPage } from "../Header/Pages/MediaPage";

function App() {
  return (
    <ChakraProvider theme={myNewTheme}>
      <DeviceTypeProvider>
        <AuthProvider>
          <FavouritesContextProvider>
            <div className="app-container">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/movie-app-ts" element={<WelcomePage />}>
                    <Route
                      path="/movie-app-ts/search/:searchValue"
                      element={<SearchMovie />}
                    ></Route>
                    <Route
                      path="/movie-app-ts/search/:searchValue"
                      element={<SearchMovie />}
                    ></Route>

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

                  <Route
                    path="/movie-app-ts/:mediaType"
                    element={<MediaPage />}
                  />

                  <Route
                    path="/:mediaType/:name/:id"
                    element={<MovieDetails />}
                  ></Route>
                  <Route
                    path="/person/:personName/:id"
                    element={<PersonDetails />}
                  ></Route>
                  <Route
                    path="/tv/:seriesName/:seriesSeason/:seriesEpisode/:id"
                    element={<EpisodeDetails />}
                  ></Route>
                  <Route
                    path="/signIn"
                    element={<SignInFormComponent />}
                  ></Route>
                  <Route path="/signUp" element={<SignUp />}></Route>
                  <Route
                    path="/favourites"
                    element={
                      <PrivateRoute>
                        <FavouritesPage />
                      </PrivateRoute>
                    }
                  ></Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </FavouritesContextProvider>
        </AuthProvider>
      </DeviceTypeProvider>
    </ChakraProvider>
  );
}

export default App;
