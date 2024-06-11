import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import CarouselComponent from "../Carousel/carousel";
import axios from "axios";
import {
  afterTheme,
  flexTheme,
  WelcomePageTheme,
  SearchBarTheme,
} from "../../../styles/theme";
import { FaChevronRight } from "react-icons/fa";
import getRandomPoster from "../../../helpers/random";
import SearchBar from "./searchBar";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import movieImg from "../../../logo/oscars.svg";
import MovieTVList from "./Lists/MovieTVList";

const WelcomePage = () => {
  const { authUser } = useAuthenticationContext();
  const [latestMovies, setLatestMovies] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);

  const [tabForMovieRequest, setTabForMovieRequest] = useState("now_playing");
  const [tabForTvRequest, setTabForTvRequest] = useState("on_the_air");
  const [tabForTrendingRequest, setTabForTrendingRequest] = useState("all");

  const [areMediaListsLoading, setAreMediaListsLoading] = useState(false);
  const [areTvListsLoading, setAreTvListsLoading] = useState(false);
  const [areTrendingListsLoading, setAreTrendingListsLoading] = useState(false);

  const { username, isPremiumUser } = authUser || {};

  const API_KEY = "380f962505ebde6dee08b0b646fe05f1";
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

  // Movie Lists

  const movieTabs = ["Now Playing", "Popular", "Top Rated", "Upcoming"];

  // Tv Lists
  const tvTabs = ["On The Air", "Top Rated", "Popular"];

  // Trending Lists

  const trendingTabs = ["All", "People"];

  const normalizeTabForRequest = (tab: string) => {
    const splitTab = tab.split(" ");

    return splitTab.length > 1
      ? splitTab.join("_").toLowerCase()
      : splitTab.join("").toLowerCase();
  };

  const handleTabClick = (tabName: string, tabType: string) => {
    if (tabType === "movie" && movieTabs.includes(tabName)) {
      setTabForMovieRequest(normalizeTabForRequest(tabName));
    } else if (tabType === "tv" && tvTabs.includes(tabName)) {
      setTabForTvRequest(normalizeTabForRequest(tabName));
    } else if (tabType === "trending" && trendingTabs.includes(tabName)) {
      if (tabName === "People") {
        setTabForTrendingRequest("person");
      } else {
        setTabForTrendingRequest(normalizeTabForRequest(tabName));
      }
    }
  };

  const getRandomImage = useCallback((data: any) => {
    return getRandomPoster(data);
  }, []);

  const randomImageMemoized = useMemo(
    () => getRandomImage(latestMovies.results),
    [latestMovies]
  );

  useEffect(() => {
    const getMovieLists = async () => {
      try {
        const URL = `https://api.themoviedb.org/3/movie/${tabForMovieRequest}?api_key=${API_KEY}`;
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setNowPlayingMovies(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setAreMediaListsLoading(false);
      }
    };
    setAreMediaListsLoading(true);
    getMovieLists();
  }, [tabForMovieRequest]);

  useEffect(() => {
    const getTVLists = async () => {
      try {
        const URL = `https://api.themoviedb.org/3/tv/${tabForTvRequest}?api_key=${API_KEY}`;
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setTvList(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setAreTvListsLoading(false);
      }
    };
    setAreTvListsLoading(true);
    getTVLists();
  }, [tabForTvRequest]);

  useEffect(() => {
    const getTrendingLists = async () => {
      try {
        const URL = `https://api.themoviedb.org/3/trending/${tabForTrendingRequest}/week?api_key=${API_KEY}`;
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setTrendingList(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setAreTrendingListsLoading(false);
      }
    };
    setAreTrendingListsLoading(true);
    getTrendingLists();
  }, [tabForTrendingRequest]);

  // Open modal if user isn't authenticated and clicks on heart icon
  const checkUserState = () => {
    if (authUser) return;
    setIsModalOpen(true);
  };

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const usernameStyle = isPremiumUser ? `${username + "⭐"}` : username;
  const displayWelcomeMessage = authUser
    ? `Welcome, ${usernameStyle}`
    : "Welcome";

  return (
    <Box display="flex" justifyContent="center">
      <Box maxWidth="1300px" width="100%">
        <Box margin={{ base: "unset", sm: "0 4rem" }}>
          <Box
            backgroundImage={`https://www.themoviedb.org/t/p/w780/${randomImageMemoized}`}
            {...WelcomePageTheme.moviePosterContainer}
            {...afterTheme.searchContainer}
          >
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
            >
              <Flex
                flexDirection="column"
                m="2.5rem auto"
                justifyContent="flex-start"
                width="90%"
                gap="4px"
              >
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
                  Millions of movies, TV shows and people to discover.Explore
                  now!
                </Box>
                <SearchBar />
              </Flex>
              <Box
                background="linear-gradient(to bottom right, #221d93 0%, #4958ab 30%, #91ced8 100%)"
                width="100%"
              >
                <Flex
                  flexDirection="column"
                  padding="1rem"
                  float="left"
                  zIndex="1"
                  m="1rem 2rem"
                  gap="1rem"
                >
                  {" "}
                  <Image src={movieImg} width="250px" />
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    mt="12px"
                    backgroundColor="transparent"
                    color="#fff"
                    borderRadius="30px"
                    border="2.5px solid #fff"
                    p="6px 12px"
                    fontWeight="600"
                    fontSize="md"
                    gap="4px"
                    cursor="pointer"
                  >
                    <Text>View the winners of 2024</Text>
                    <Text>
                      <FaChevronRight />
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Outlet />
          <Box
            mt="20px"
            {...flexTheme}
            flexDirection="column"
            alignItems="flex-start"
          ></Box>
          <Box mt="1rem">
            <MovieTVList
              data={tvList}
              tabs={tvTabs}
              isLoading={areTvListsLoading}
              description="Discover TV Shows"
              handleTabClick={handleTabClick}
              getRandomImage={getRandomImage}
              checkUserState={checkUserState}
              tabType="tv"
            />
          </Box>

          <Box mt="1rem">
            <MovieTVList
              data={trendingList}
              tabs={trendingTabs}
              isLoading={areTrendingListsLoading}
              description="Trending this week"
              handleTabClick={handleTabClick}
              getRandomImage={getRandomImage}
              checkUserState={checkUserState}
              tabType="trending"
            />
          </Box>

          <Box mt="1rem" textAlign="left" fontSize="30px" letterSpacing="1.2px">
            <Text fontSize="22px" ml={{ base: "8px", md: "unset" }}>
              Newest movies
            </Text>
          </Box>

          <Box mt="-0.5rem">
            <CarouselComponent
              isLoading={isLoading}
              latestMovies={latestMovies.results}
              isModalOpen={isModalOpen}
              onCloseModal={onCloseModal}
              checkUserState={checkUserState}
            />
          </Box>

          <Box>
            <MovieTVList
              data={nowPlayingMovies}
              tabs={movieTabs}
              isLoading={areMediaListsLoading}
              description="Discover movies"
              handleTabClick={handleTabClick}
              getRandomImage={getRandomImage}
              checkUserState={checkUserState}
              tabType="movie"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomePage;
