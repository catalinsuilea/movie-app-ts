import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
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
import oscarsImgDesktop from "../../../logo/oscars.svg";
import oscarsImgMobile from "../../../logo/oscars-mobile.svg";
import MovieTVList from "./Lists/MovieTVList";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import {
  LatestMoviesTypes,
  MovieData,
} from "../../../types-modules/HomepageTypes/HomepageTypes";

const WelcomePage = () => {
  const { authUser } = useAuthenticationContext();
  const [latestMovies, setLatestMovies] = useState<LatestMoviesTypes>(
    {} as LatestMoviesTypes
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);

  const [tabForMovieRequest, setTabForMovieRequest] = useState("now_playing");
  const [tabForTvRequest, setTabForTvRequest] = useState("top_rated");
  const [tabForTrendingRequest, setTabForTrendingRequest] = useState("all");

  const [areMediaListsLoading, setAreMediaListsLoading] = useState(false);
  const [areTvListsLoading, setAreTvListsLoading] = useState(false);
  const [areTrendingListsLoading, setAreTrendingListsLoading] = useState(false);

  const { isMobile } = useDeviceTypeContext();

  const { username, isPremiumUser } = authUser || {};

  const API_KEY = process.env.REACT_APP_MOVIEDB_KEY;

  //Get lates movies
  useEffect(() => {
    setIsLoading(true);
    const fetchLatestMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = res.data;
        setLatestMovies(data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching the latest movies", error);
      }
    };
    fetchLatestMovies();
  }, []);

  // Movie Lists

  const movieTabs = ["Now Playing", "Popular", "Top Rated", "Upcoming"];

  // Tv Lists
  const tvTabs = ["Top Rated", "Popular", "On The Air"];

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

  const getRandomImage = useCallback((data: MovieData[]) => {
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
                m={{ base: "1rem 0 0 0", md: "2.5rem auto" }}
                justifyContent="flex-start"
                width={{ base: "85%", md: "90%" }}
                gap="4px"
                pb={{ base: "1.5rem", md: "unset" }}
              >
                <Box
                  {...SearchBarTheme.welcomeText}
                  fontSize={{ base: "21px", md: "36px" }}
                >
                  {displayWelcomeMessage}
                </Box>
                <Box
                  {...SearchBarTheme.paragraphText}
                  fontSize={{ base: "15px", md: "28px" }}
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
                  m={{ base: "0.5rem", md: "1rem 2rem" }}
                  gap="1rem"
                >
                  {" "}
                  <Image
                    src={!isMobile ? oscarsImgDesktop : oscarsImgMobile}
                    width="250px"
                    ml={{ base: "-2rem", md: "0" }}
                  />
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
                    fontSize={{ base: "sm", md: "md" }}
                    gap="4px"
                    cursor="pointer"
                  >
                    <Link
                      href="https://www.imdb.com/news/ni64480341/"
                      target="_blank"
                    >
                      View the winners on IMDB
                    </Link>
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
              tabType="movie"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomePage;
