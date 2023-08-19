import React, { useState, createContext, useMemo } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import PlacementExample from "../Drawer/Drawer";
import CarouselComponent from "../Carousel/carousel";
import Header from "../Header/Header";
import {
  afterTheme,
  flexTheme,
  WelcomePageTheme,
  SearchBarTheme,
} from "../../../styles/theme";
import moviePosters from "../../../helpers/posters";
import getRandomPoster from "../../../helpers/random";
import SearchBar from "./searchBar";
import SearchMovie from "../SearchMovie/SearchMovie";
import { useAuthenticationContext } from "../SignUp/AuthenticationContext";

export const MovieNameContext = createContext("");
const WelcomePage = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const { authUser } = useAuthenticationContext();

  const randomImage = useMemo(() => {
    return getRandomPoster(moviePosters);
  }, [moviePosters]);

  const displayWelcomeMessage = authUser
    ? `Welcome, ${authUser.displayName}`
    : "Welcome";

  return (
    <Box>
      <Header />
      <Box margin="0 5em">
        <Box
          backgroundImage={randomImage}
          {...WelcomePageTheme.moviePosterContainer}
          {...afterTheme.searchContainer}
        >
          <Box {...flexTheme} alignItems="unset" flexDirection="column">
            <Box width="81%" m="40px auto">
              <Box {...SearchBarTheme.welcomeText}>{displayWelcomeMessage}</Box>
              <Box {...SearchBarTheme.paragraphText}>
                Millions of movies, TV shows and people to discover.Explore now!
              </Box>
            </Box>
            <SearchBar setMovieTitle={setMovieTitle} />
          </Box>
        </Box>
        <Outlet />
        <Box
          mt="20px"
          {...flexTheme}
          flexDirection="column"
          alignItems="flex-start"
        >
          <PlacementExample />
          <Box textAlign="left" fontSize="30px" letterSpacing="1.2px">
            <h1>Newest movies</h1>
          </Box>
        </Box>
        <Routes>
          <Route
            path="/movie/:value"
            element={
              <MovieNameContext.Provider value={movieTitle}>
                <SearchMovie />
              </MovieNameContext.Provider>
            }
          ></Route>
        </Routes>
        <Box>
          <CarouselComponent />
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomePage;
