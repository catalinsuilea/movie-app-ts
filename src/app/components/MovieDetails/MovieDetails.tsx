import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cast from "../../../types-modules/Cast";
import Crew from "../../../types-modules/Crew";
import MovieInfo from "../../../types-modules/MovieInfo";
import { Box, Center, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { MovieDetailsTheme } from "../../../styles/theme";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { CardDetails } from "./CardDetails";
import { TVShowDetails } from "../TVShowDetails/TvDetails";
import { MediaTypeDetailsDesktop } from "../common/MediaTypeDetailsDesktop";
import { CustomCarousel } from "../common/CustomCarousel";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { SignInModal } from "../Modal/SignInModal";
import { UserReviews } from "../RatingAndReviews/UserReviews";
import { FavouriteIcon } from "../common/FavouriteIcon";
import { PopularityStatus } from "../common/PopularityStatus";

interface CastInfo {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
}
const MovieDetails = () => {
  const API_KEY = "380f962505ebde6dee08b0b646fe05f1";
  const { id, mediaType } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [castInfo, setCastInfo] = useState<CastInfo>({});
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);

  const [trailers, setTrailers] = useState([]);
  const [photos, setPhotos] = useState([]);

  const { authUser } = useAuthenticationContext();
  const {
    handleFavourites,
    checkIsFavourite,
    setIsFavourite,
    isFavourite,
    favouritesMoviesFromDB,
  } = useFavourites();

  const { isMobile, isTablet, isDesktop } = useDeviceTypeContext();
  const { cast, crew } = castInfo;

  useEffect(() => {
    setIsFavourite(
      Boolean(
        favouritesMoviesFromDB?.find((movie: any) => movie.id === Number(id))
      )
    );
  }, [favouritesMoviesFromDB, id]);

  // Open modal if user isn't authenticated and clicks on heart icon
  const checkUserState = () => {
    if (authUser) return;
    setIsModalOpen(true);
  };

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const sortedCast = cast?.sort((a, b) => {
    if (a.profile_path && !b.profile_path) {
      return -1;
    } else if (!a.profile_path && b.profile_path) {
      return 1;
    } else {
      return 0;
    }
  });

  const handleVoteCount = (item: number) => {
    if (!item) return;
    const numberToString = item?.toString();
    const arr = numberToString?.split("");
    if (arr?.length >= 4) {
      return `${(Number(item) / 1000).toFixed(0)}K`;
    } else {
      return item;
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/images?api_key=${API_KEY}`
      );
      const data = await res.data;
      setPhotos(data.backdrops);
    };
    fetchPhotos();
  }, [id, mediaType]);

  useEffect(() => {
    const fetchTrailers = async () => {
      if (!id || !mediaType) return;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${API_KEY}`,
          { method: "GET", credentials: "omit" }
        );
        if (!res.ok) {
          throw new Error(`${res.statusText}, ${res.status}`);
        }
        const data = await res.json();
        setTrailers(data.results);
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    };
    fetchTrailers();
  }, [id, mediaType]);

  useEffect(() => {
    const fetchCastInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.data;
      setCastInfo(data);
    };
    fetchCastInfo();
  }, [id, mediaType]);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.data;
      setMovieInfo(data);
    };
    fetchMovieInfo();
  }, [id]);

  return (
    movieInfo && (
      <Box>
        {isDesktop && (
          <MediaTypeDetailsDesktop
            data={movieInfo}
            isDesktop={isDesktop}
            isMobile={isMobile}
            isTablet={isTablet}
            mediaType={mediaType}
            castInfo={castInfo}
            handleVoteCount={handleVoteCount}
            handleFavourites={handleFavourites}
            checkIsFavourite={checkIsFavourite}
            isFavourite={isFavourite}
            checkUserState={checkUserState}
          />
        )}

        {/** mobile */}
        {isMobile && (
          <Box>
            <Flex
              position="relative"
              minHeight="100%"
              backgroundImage={`url(https://www.themoviedb.org/t/p/w780/${
                movieInfo?.still_path || movieInfo?.poster_path
              })`}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              opacity="1"
              zIndex="1"
              _after={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: "#002244",
                opacity: 0.8,
                zIndex: "-1",
              }}
            >
              <Box mt="12px">
                <Image
                  maxWidth="unset !important"
                  width="120px"
                  m="0 10px"
                  src={`https://www.themoviedb.org/t/p/w780/${movieInfo?.poster_path}`}
                  alt="movie-original-poster"
                />
              </Box>
              <Box
                mt="12px"
                display="flex"
                flexDirection="column"
                overflowX="auto"
                css={{ ...MovieDetailsTheme.customScrollBar }}
              >
                <Box>
                  <Flex overflowX="auto">
                    {movieInfo?.genres?.map((genre) => (
                      <Box
                        key={genre.id}
                        margin="0 4px"
                        border="1px solid #fff"
                        borderRadius="16px"
                      >
                        <Text
                          width="max-content"
                          p="2px 6px"
                          fontSize="14px"
                          color="#fff"
                          m="0 4px"
                        >
                          {genre.name}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>

                <Box color="#fff" fontSize="15px" p="6px 8px 6px 6px">
                  <Text mt="4px">PG</Text>
                  <Text mt="4px">Release date: {movieInfo?.release_date} </Text>
                  <Text mt="4px">{movieInfo?.tagline}</Text>
                  <Text
                    ml="-4px"
                    mt="4px"
                  >{`⭐${movieInfo?.vote_average.toFixed(
                    1
                  )}/10 - ${handleVoteCount(
                    movieInfo?.vote_count!
                  )} votes`}</Text>
                </Box>
              </Box>
            </Flex>
            <Box
              flexDirection="column"
              backgroundColor="#041E42"
              p="1rem 1.5rem"
            >
              <Flex
                gap="1rem"
                alignItems="start"
                justifyContent="space-around"
                m="12px 0"
              >
                <PopularityStatus popularityValue={movieInfo.popularity} />
                <FavouriteIcon
                  isFavourite={isFavourite}
                  checkUserState={checkUserState}
                  handleFavourites={handleFavourites}
                  checkIsFavourite={checkIsFavourite}
                  data={movieInfo}
                  id={movieInfo?.id}
                  media_type={mediaType}
                />
              </Flex>

              <Text color="#fff" width="100%">
                {movieInfo?.overview}
              </Text>
            </Box>
          </Box>
        )}
        {trailers.length > 0 && (
          <Flex
            m={{ base: "2rem 1rem 0 1rem", md: "2rem 2rem 0 2rem" }}
            flexDirection="column"
          >
            <Flex alignItems="center" gap="8px">
              <Center height="35px">
                <Divider
                  orientation="vertical"
                  borderWidth="4px"
                  borderColor="#00308F"
                />
              </Center>
              <Text fontSize="3xl" fontWeight="bold">
                Videos
              </Text>
            </Flex>
            <Box maxWidth="1250px">
              <CustomCarousel
                data={trailers}
                slidesToShow={isMobile ? 1 : 2}
                slidesToScroll={isMobile ? 1 : 2}
                componentName="Trailers"
              />
            </Box>
          </Flex>
        )}

        {photos.length > 0 && (
          <Flex
            m={{ base: "0 1rem", md: "2rem 2rem 0 2rem" }}
            flexDirection="column"
          >
            <Flex alignItems="center" gap="8px">
              <Center height="35px">
                <Divider
                  orientation="vertical"
                  borderWidth="4px"
                  borderColor="#00308F"
                />
              </Center>
              <Text fontSize="3xl" fontWeight="bold">
                Photos
              </Text>
            </Flex>
            <Box maxWidth="1250px">
              <CustomCarousel
                data={photos}
                componentName="MediaPhotos"
                slidesToShow={isMobile ? 1 : 4}
                slidesToScroll={isMobile ? 1 : 4}
              />
            </Box>
          </Flex>
        )}

        <Flex flexDirection="column" m={{ base: "unset", md: "0 2rem" }}>
          {mediaType === "tv" && (
            <TVShowDetails seriesId={id} data={movieInfo} />
          )}

          <Text
            fontSize="22px"
            m={{ base: "1rem 0 0 1rem", md: " 24px 0 0 32px" }}
          >
            Top Billed Cast
          </Text>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            m="0 20px"
            gap={{ md: "24px" }}
          >
            <CardDetails cast={sortedCast} />

            <Box textAlign="left" ml={{ base: "16px", lg: "unset" }}>
              <Box mb={{ base: "16px", md: "unset" }}>
                <Text mt="6px" fontWeight="bold">
                  Status
                </Text>
                <Text>{movieInfo?.status}</Text>
                <Box>
                  <Text mt="6px" fontWeight="bold">
                    Original Language
                  </Text>{" "}
                  <Text>{movieInfo?.original_language?.toUpperCase()}</Text>
                </Box>
                <Box>
                  <Text mt="6px" fontWeight="bold">
                    Release date:
                  </Text>
                  <Text>{movieInfo?.release_date}</Text>
                </Box>
                <Box>
                  <Text mt="6px" fontWeight="bold">
                    Budget
                  </Text>
                  <Text>{`$${
                    movieInfo?.budget || Math.floor(Math.random() * 10000000)
                  }`}</Text>
                </Box>
                <Box>
                  <Text mt="6px" fontWeight="bold">
                    Revenue
                  </Text>
                  <Text>{`$${
                    movieInfo.revenue || Math.floor(Math.random() * 10000000)
                  }`}</Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Flex>
        {/* Reviews */}
        <UserReviews mediaData={movieInfo} mediaId={id} mediaType={mediaType} />

        <SignInModal
          modalType="favourites"
          isModalOpen={isModalOpen}
          onCloseModal={onCloseModal}
        />
      </Box>
    )
  );
};
export default MovieDetails;
