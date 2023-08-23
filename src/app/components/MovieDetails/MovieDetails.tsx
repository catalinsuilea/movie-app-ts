import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cast from "../../../types-modules/Cast";
import Crew from "../../../types-modules/Crew";
import MovieInfo from "../../../types-modules/MovieInfo";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Header from "../Header/Header";
import {
  afterTheme,
  flexTheme,
  MovieDetailsTheme,
} from "../../../styles/theme";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
interface CastInfo {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
}
const MovieDetails = () => {
  const { id } = useParams();
  const [castInfo, setCastInfo] = useState<CastInfo>({});
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);

  const { isMobile, isTablet, isDesktop } = useDeviceTypeContext();

  useEffect(() => {
    const fetchCastInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
      );
      const data = await res.data;
      setCastInfo(data);
    };
    fetchCastInfo();
  }, [id]);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
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
    <Box>
      <Header />
      <Box
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w780/${movieInfo?.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          zIndex: "-1",
        }}
        position="relative"
        height={`${isMobile ? "130px" : "unset"}`}
        {...afterTheme.demo}
      >
        <Box {...flexTheme} position="relative" width="100%" color="#fff">
          {!isMobile ? (
            <Flex {...MovieDetailsTheme.imgMovieDescription}>
              <Image
                width={{ base: "200px", md: "370px" }}
                m={{ lg: "0 10px" }}
                marginTop={{ md: "24px", lg: "0" }}
                pl={{ md: "16px", lg: "unset" }}
                src={`https://www.themoviedb.org/t/p/w780/${movieInfo?.poster_path}`}
                alt="movie-original-poster"
              />
            </Flex>
          ) : (
            <Box m="16px">
              <Heading fontSize="18px">{movieInfo?.title}</Heading>
              <Flex mt="6px">
                <Text mr="8px">
                  {`${movieInfo?.release_date?.split("-").slice(0, 1)}`}{" "}
                </Text>
                <Text mr="8px">
                  {" "}
                  {movieInfo?.status.split("").splice(0, 1)}
                </Text>
                <Text> {`${(movieInfo?.runtime! / 60).toFixed(0)}h`}</Text>
              </Flex>
            </Box>
          )}
          {!isMobile && (
            <Box {...MovieDetailsTheme.movieInfo}>
              <Flex
                flexWrap="wrap"
                align={{ md: "center", lg: "start" }}
                flexDirection={{ lg: "column" }}
                gap="16px"
              >
                <Heading fontSize={isTablet ? "24px" : "36px"}>
                  {movieInfo?.title}{" "}
                  {`(${movieInfo?.release_date?.split("-").slice(0, 1)})`}{" "}
                </Heading>
                <Text
                  fontSize={{ md: "22px", lg: "26px" }}
                  m="12px 0"
                >{`⭐${movieInfo?.vote_average.toFixed(
                  1
                )}/10 - ${handleVoteCount(
                  movieInfo?.vote_count!
                )} votes`}</Text>
              </Flex>
              <Box {...MovieDetailsTheme.movieDetails}>
                <Text>PG</Text>
                <Text m="0 5px">{movieInfo?.release_date} </Text>
                {`(${movieInfo?.original_language?.toUpperCase()})`}
                <Flex>
                  {movieInfo?.genres?.map((genre) => (
                    <Text m="0 5px">{genre.name},</Text>
                  ))}
                </Flex>
              </Box>
              <Text>{movieInfo?.tagline}</Text>
              <Text>Overview</Text>
              <Text>{movieInfo?.overview}</Text>
              {isDesktop && (
                <Flex {...MovieDetailsTheme.movieCrew}>
                  {crew?.map((member: Crew, i: number) =>
                    i >= 6 ? (
                      ""
                    ) : (
                      <Box {...MovieDetailsTheme.crew}>
                        <Text fontWeight="bold">{member.original_name}</Text>
                        <Text>{member.job}</Text>
                      </Box>
                    )
                  )}
                </Flex>
              )}
            </Box>
          )}
        </Box>
        {isTablet && (
          <Flex color="#fff" mt="8px" {...MovieDetailsTheme.movieCrew}>
            {crew?.map((member: Crew, i: number) =>
              i >= 6 ? (
                ""
              ) : (
                <Box {...MovieDetailsTheme.crew}>
                  <Text fontWeight="bold">{member.original_name}</Text>
                  <Text>{member.job}</Text>
                </Box>
              )
            )}
          </Flex>
        )}
      </Box>

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
              overflowX="scroll"
            >
              <Box>
                <Flex overflowX="scroll">
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
                <Text ml="-4px" mt="4px">{`⭐${movieInfo?.vote_average.toFixed(
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
        <Text fontSize="22px" m={{ base: "24px 0 24px 32px" }}>
          Top Billed Cast
        </Text>
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          m="0 20px"
          gap="24px"
        >
          <Box width={{ base: "95%", lg: "85%" }} textAlign="left">
            <Box {...MovieDetailsTheme.charactersCardsContainer}>
              {sortedCast?.map((item: Cast) => (
                <Box {...MovieDetailsTheme.charcacterCard}>
                  <Box {...MovieDetailsTheme.img}>
                    <Image
                      borderTopLeftRadius="15px"
                      borderTopRightRadius="15px"
                      height="250px"
                      src={
                        item.profile_path
                          ? `https://www.themoviedb.org/t/p/w780/${item.profile_path}`
                          : "https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man-300x284.jpg"
                      }
                      alt="character-img"
                    ></Image>
                  </Box>
                  <Flex {...MovieDetailsTheme.characterNames}>
                    <Box>
                      <Text fontWeight="500">{item.name}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="14px">{item.character}</Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
          <Box textAlign="left" ml={{ base: "16px", lg: "unset" }}>
            <Box>
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
  );
};
export default MovieDetails;
