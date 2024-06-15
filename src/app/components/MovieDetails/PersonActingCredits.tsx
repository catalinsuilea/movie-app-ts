import React from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PersonMoviesTVShowTypes } from "../../../types-modules/HomepageTypes/HomepageTypes";

export const PersonActingCredits = ({
  sortedMovies,
}: {
  sortedMovies: PersonMoviesTVShowTypes[];
}) => {
  return (
    <Box p={{ base: "0", md: "4" }}>
      <Heading as="h2" size="md" m="1rem">
        Acting
      </Heading>
      <Box
        p={4}
        boxShadow="0 2px 8px rgba(0,0,0,.1)"
        borderRadius="md"
        bg="white"
        overflowY="auto"
        height={{ base: "450px", md: "unset" }}
      >
        {sortedMovies.map((movie, index) => (
          <Flex flexDirection="column-reverse" width="100%">
            <Link
              to={`/movie/${movie.title || movie.original_title}/${movie.id}`}
              key={index}
              style={{ margin: "1rem 0" }}
            >
              <Flex gap="8px">
                {" "}
                <Text fontWeight="bold">{movie.title}</Text>
                {movie.release_date && (
                  <Text>
                    (
                    {new Date(
                      movie?.release_date ||
                        movie?.releaseDate ||
                        movie.first_air_date
                    ).toLocaleDateString("EN", {
                      year: "numeric",
                    })}
                    )
                  </Text>
                )}
              </Flex>
              {movie.character && <Text>as {movie.character}</Text>}
            </Link>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
