import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cast from "../../../types-modules/Cast";
import Crew from "../../../types-modules/Crew";
import MovieInfo from "../../../types-modules/MovieInfo";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { MovieDetailsTheme } from "../../../styles/theme";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { CardDetails } from "./CardDetails";
import { TVShowDetails } from "../TVShowDetails/TvDetails";
import { MediaTypeDetailsDesktop } from "../common/MediaTypeDetailsDesktop";

interface CastInfo {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
}
const MovieDetails = () => {
  const { id, mediaType } = useParams();
  const [castInfo, setCastInfo] = useState<CastInfo>({});
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  const { isMobile, isTablet, isDesktop } = useDeviceTypeContext();

  useEffect(() => {
    const fetchCastInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
      );
      const data = await res.data;
      setCastInfo(data);
    };
    fetchCastInfo();
  }, [id, mediaType]);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
      );
      const data = await res.data;
      setMovieInfo(data);
    };
    fetchMovieInfo();
  }, [id]);

  const { cast, crew } = castInfo;

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
          />
        )}

        {/** mobile */}
        {isMobile && (
          <Box backgroundColor="black">
            <Flex>
              <Box mt="12px" {...MovieDetailsTheme.imgMovieDescription}>
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
            <Text p="12px 8px 12px 0" color="#fff" m="0 12px">
              {movieInfo?.overview}
            </Text>
          </Box>
        )}
        <Flex flexDirection="column" m={{ base: "unset", md: "0 2rem" }}>
          {mediaType === "tv" && (
            <TVShowDetails seriesId={id} data={movieInfo} />
          )}

          <Text fontSize="22px" m={{ base: "24px 0 0 32px" }}>
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
                  <Text>{`$${movieInfo?.budget}`}</Text>
                </Box>
                <Box>
                  <Text mt="6px" fontWeight="bold">
                    Revenue
                  </Text>
                  <Text>{`$${movieInfo?.revenue}`}</Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
    )
  );
};
export default MovieDetails;
