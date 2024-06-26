import React from "react";

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { flexTheme, MovieDetailsTheme } from "../../../styles/theme";
import { PopularityStatus } from "./PopularityStatus";
import { FavouriteIcon } from "./FavouriteIcon";
import { MediaTypeDetailsDesktopTypes } from "../../../types-modules/MediaTypeDetailsDesktop";

export const MediaTypeDetailsDesktop = ({
  data,
  isDesktop,
  isMobile,
  isTablet,
  mediaType,
  handleVoteCount,
  castInfo,
  handleFavourites,
  checkIsFavourite,
  isFavourite,
  checkUserState,
}: MediaTypeDetailsDesktopTypes) => {
  const { crew } = castInfo;

  return (
    <Box
      position="relative"
      minHeight="100%"
      backgroundImage={`url(https://www.themoviedb.org/t/p/w780/${
        data?.still_path || data.poster_path
      })`}
      backgroundSize="45%"
      backgroundPosition="top -120px right 0px"
      backgroundRepeat="no-repeat"
      zIndex="1"
      opacity="1"
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "blue.500",
        opacity: 0.9,
      }}
    >
      <Flex
        p="4"
        justifyContent="center"
        alignItems="center"
        position="relative"
        opacity="1"
        zIndex="6"
      >
        <Box
          p="4"
          display="flex"
          justifyContent="flex-start"
          maxWidth="1300px"
          color="#fff"
          zIndex="5"
        >
          <Box
            gap="3rem"
            {...flexTheme}
            position="relative"
            width="100%"
            color="#fff"
          >
            {!isMobile ? (
              <Flex {...MovieDetailsTheme.imgMovieDescription}>
                <Image
                  borderRadius="5px"
                  width={{ base: "200px", md: "370px" }}
                  m={{ lg: "0 10px" }}
                  marginTop={{ md: "24px", lg: "0" }}
                  pl={{ md: "16px", lg: "unset" }}
                  src={`https://www.themoviedb.org/t/p/w780/${
                    data?.poster_path || data.still_path
                  }`}
                  alt="movie-original-poster"
                />
              </Flex>
            ) : (
              <Box m="16px">
                <Heading fontSize="18px">{data?.title || data?.name}</Heading>
                <Flex mt="6px">
                  <Text mr="8px">
                    {`${data?.release_date?.split("-").slice(0, 1)}`}{" "}
                  </Text>
                  <Text mr="8px"> {data?.status.split("").splice(0, 1)}</Text>
                  <Text> {`${(data?.runtime! / 60).toFixed(0)}h`}</Text>
                </Flex>
              </Box>
            )}
            {!isMobile && (
              <Box {...MovieDetailsTheme.movieInfo}>
                <Flex
                  flexWrap="wrap"
                  align={{ md: "center", lg: "start" }}
                  flexDirection={{ lg: "column" }}
                >
                  <Heading mt="12px" fontSize={isTablet ? "24px" : "36px"}>
                    {data?.title || data?.name}{" "}
                    {mediaType === "tv"
                      ? `(${data?.first_air_date?.split("-").slice(0, 1)}-${
                          data?.in_production
                            ? ""
                            : data?.last_air_date?.split("-").slice(0, 1)
                        })`
                      : `(${data?.release_date?.split("-").slice(0, 1)})`}
                  </Heading>

                  <Text
                    fontSize={{ md: "22px", lg: "26px" }}
                    m="12px 0"
                  >{`⭐${data?.vote_average.toFixed(1)}/10 - ${handleVoteCount(
                    data?.vote_count!
                  )} votes`}</Text>
                  <Flex alignItems="start" gap="1.75rem">
                    <PopularityStatus popularityValue={data.popularity} />
                    <Box>
                      <FavouriteIcon
                        isFavourite={isFavourite}
                        checkUserState={checkUserState}
                        handleFavourites={handleFavourites}
                        checkIsFavourite={checkIsFavourite}
                        data={data}
                        id={data.id}
                        media_type={mediaType}
                        isMovieDetails
                      />
                    </Box>
                  </Flex>
                </Flex>

                <Box {...MovieDetailsTheme.movieDetails}>
                  <Box p="4px" border="1px solid rgba(255,255,255,0.6)">
                    {" "}
                    <Text>PG</Text>
                  </Box>

                  <Text m="0 5px">{data?.release_date} </Text>
                  {`(${data?.original_language?.toUpperCase()})`}
                  <Flex>
                    {data?.genres?.map((genre) => (
                      <Text m="0 5px">{genre.name},</Text>
                    ))}
                  </Flex>
                </Box>
                <Text>{data?.tagline}</Text>
                <Text>Overview</Text>
                <Text>{data?.overview}</Text>
                {isDesktop && (
                  <Flex {...MovieDetailsTheme.movieCrew}>
                    {crew?.map((member, i: number) =>
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
        </Box>
      </Flex>
    </Box>
  );
};
