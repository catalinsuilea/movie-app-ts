import React, { useState, useMemo, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CarouselComponent from "../Carousel/carousel";
import axios from "axios";
import {
  afterTheme,
  flexTheme,
  WelcomePageTheme,
  SearchBarTheme,
} from "../../../styles/theme";
import {
  moviePostersDesktop,
  moviePostersMobile,
} from "../../../helpers/posters";
import getRandomPoster from "../../../helpers/random";
import SearchBar from "./searchBar";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";

const WelcomePage = () => {
  const { authUser } = useAuthenticationContext();
  const { isMobile } = useDeviceTypeContext();
  const [latestMovies, setLatestMovies] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Get lates movies
  useEffect(() => {
    setIsLoading(true);
    const fetchLatestMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US&page=1"
        );
        const data = res.data;
        setLatestMovies(data);
        setIsLoading(false);
      } catch (error: any) {
        console.log("Error fetching the latest movies", error);
      }
    };
    fetchLatestMovies();
  }, []);

  // Open modal if user isn't authenticated and clicks on heart icon
  const checkUserState = () => {
    if (authUser) return;
    setIsModalOpen(true);
  };

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const randomImage = isMobile
    ? getRandomPoster(moviePostersMobile)
    : getRandomPoster(moviePostersDesktop);

  const displayWelcomeMessage = authUser
    ? `Welcome, ${authUser.username}`
    : "Welcome";

  return (
    <Box>
      <Box margin={{ base: "unset", sm: "0 5rem" }}>
        <Box
          backgroundImage={randomImage}
          {...WelcomePageTheme.moviePosterContainer}
          {...afterTheme.searchContainer}
        >
          <Flex alignItems="center" flexDirection="column">
            <Box width="81%" m="40px auto">
              <Box
                {...SearchBarTheme.welcomeText}
                fontSize={{ base: "26px", md: "36px" }}
              >
                {displayWelcomeMessage}
              </Box>
              <Box
                {...SearchBarTheme.paragraphText}
                fontSize={{ base: "22px", md: "28px" }}
              >
                Millions of movies, TV shows and people to discover.Explore now!
              </Box>
            </Box>
            <SearchBar />
          </Flex>
        </Box>
        <Outlet />
        <Box
          mt="20px"
          {...flexTheme}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box textAlign="left" fontSize="30px" letterSpacing="1.2px">
            <Text fontSize="22px" ml={{ base: "8px", md: "unset" }}>
              Newest movies
            </Text>
          </Box>
        </Box>
        <Box>
          <CarouselComponent
            isLoading={isLoading}
            latestMovies={latestMovies.results}
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
            checkUserState={checkUserState}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomePage;
