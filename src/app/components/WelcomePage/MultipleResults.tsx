import React, { useState, useRef, useEffect } from "react";
import { Box, Text, VStack, Image, Flex } from "@chakra-ui/react";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { useNavigate } from "react-router-dom";
import { getCardRoute, getMediaType } from "../../../utils/searchBard.utils";

export const MultipleResults = ({ movieSearch }: any) => {
  const [isVisible, setIsVisible] = useState(true);
  const { isMobile } = useDeviceTypeContext();
  const boxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    setIsVisible(true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onCardClick = (route: any) => {
    navigate(route);
  };

  return isVisible ? (
    <Box
      ref={boxRef}
      width="99%"
      overflowY="scroll"
      mx="auto"
      mt="1.5rem"
      backgroundColor="#f8f9fa"
      maxHeight="350px"
      position="absolute"
      right="0"
      left="0"
      top="2rem"
      borderTopLeftRadius="10px"
      borderTopRightRadius="10px"
      pb="1rem"
    >
      <VStack spacing="4" mt="4" align="stretch" px="4px">
        {movieSearch.map((movie: any) => (
          <Box
            key={movie.id}
            p="0.5rem"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            display="flex"
            alignItems="center"
            onClick={() =>
              onCardClick(
                getCardRoute(
                  movie.title || movie.name || movie.original_name,
                  movie.id,
                  movie.media_type
                )
              )
            }
            _hover={{
              cursor: "pointer",
              boxShadow: "0 0 6px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Image
              boxSize="100px"
              objectFit="cover"
              src={`https://image.tmdb.org/t/p/w200${
                movie.poster_path || movie.backdrop_path || movie.profile_path
              }`}
              alt={movie.title}
              mr={4}
            />
            <Flex flexDirection="column" gap="2px">
              <Text fontWeight="bold" fontSize={isMobile ? "sm" : "lg"}>
                {movie.title || movie.name || movie.original_name}
              </Text>
              <Text>{getMediaType(movie.media_type, movie.gender)}</Text>
              {movie.media_type !== "person" && (
                <Text fontSize={isMobile ? "sm" : "lg"} color="gray.500">
                  {new Date(
                    movie?.release_date ||
                      movie?.releaseDate ||
                      movie.first_air_date
                  ).toLocaleDateString("EN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              )}

              {movie.known_for && (
                <Flex gap="4px">
                  Known for:
                  {movie.known_for.map((knownMovie: any, index: number) => (
                    <Text key={knownMovie.id} fontWeight={600}>
                      {knownMovie.original_title || knownMovie.original_name}
                      {index < movie.known_for.length - 1 ? ", " : ""}
                    </Text>
                  ))}
                </Flex>
              )}

              <Flex
                alignItems="center"
                gap="4px"
                fontSize={isMobile ? "sm" : "lg"}
              >
                ⭐
                <Text fontWeight="bold">
                  {movie?.voteAverage?.toFixed(1) ||
                    movie?.vote_average?.toFixed(1) ||
                    (movie.popularity / 10).toFixed(1)}
                </Text>
              </Flex>
              {/* <Text fontSize="md">{movie?.overview}</Text> */}
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  ) : null;
};
