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
import SignUp from "../SignUp/signup";
import { SignInFormComponent } from "../SignUp/SignInFormComponent";
import { AuthProvider } from "../SignUp/AuthenticationContext";

export const MovieNameContext = createContext("");
function App() {
  return (
    <div className="App">
      <ChakraProvider theme={myNewTheme}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />}>
              <Route path="/movie/:value" element={<SearchMovie />}></Route>
              <Route path="/top-rated-movies" element={<Popularity />}>
                <Route
                  path="/top-rated-movies/page=:page"
                  element={<Popularity />}
                />
              </Route>
              <Route path="genres" element={<GetGenres />}>
                <Route
                  path="movies/:genreName/:genreID"
                  element={<GetMovies />}
                />
              </Route>
            </Route>
            <Route path="/:movieName/:id" element={<MovieDetails />}></Route>
            <Route path="/signIn" element={<SignInFormComponent />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </div>
  );
}
export default App;
