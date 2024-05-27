import React from "react";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const PersonActingCredits = ({ sortedMovies }: any) => {
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
      >
        {sortedMovies.map((movie: any, index: number) => (
          <Flex flexDirection="column" width="100%">
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
