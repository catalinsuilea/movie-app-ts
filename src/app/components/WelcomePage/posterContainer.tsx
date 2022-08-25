import React from "react";
import { Box } from "@chakra-ui/react";
import {
  afterTheme,
  flexTheme,
  WelcomePageTheme,
  SearchBarTheme,
} from "../../../styles/theme";
import moviePosters from "../../../helpers/posters";
import getRandomPoster from "../../../helpers/random";
const PosterContainer = () => {
  return (
    <Box
      backgroundImage={`${getRandomPoster(moviePosters)}`}
      {...WelcomePageTheme.moviePosterContainer}
      {...afterTheme.searchContainer}
    >
      <Box {...flexTheme} alignItems="unset" flexDirection="column">
        <Box width="81%" m="40px auto">
          <Box {...SearchBarTheme.welcomeText}>Welcome.</Box>
          <Box {...SearchBarTheme.paragraphText}>
            Millions of movies, TV shows and people to discover.Explore now!
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default PosterContainer;
