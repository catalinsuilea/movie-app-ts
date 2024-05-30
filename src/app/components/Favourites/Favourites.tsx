import React, { useState, useEffect } from "react";
import { Heading, Box, Flex, Image, Text } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";
import { useFavourites } from "../../contexts/useFavouritesContext";
import addToFavouritesImg from "../../../images/addToFavouritesImg.jpg";
import { useAuthenticationContext } from "../../../app/contexts/AuthenticationContext";

export const FavouritesPage = () => {
  const { favouritesMoviesFromDB } = useFavourites();
  const [isLoading, setIsLoading] = useState(true);
  const { authUser, isUserFetched } = useAuthenticationContext();

  const { token } = authUser || {};

  useEffect(() => {
    if (favouritesMoviesFromDB) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [favouritesMoviesFromDB?.length]);

  return !isUserFetched && !token ? (
    <Text>Loading...</Text>
  ) : (
    <Box>
      {favouritesMoviesFromDB?.length === 0 ? (
        <Flex
          height="unset !important"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading textAlign="center" margin="2rem">
            Looks like you haven't added any movie to favourites yet
          </Heading>
          <Image src={addToFavouritesImg} alt="Add to favourites image" />
        </Flex>
      ) : (
        <Box>
          {favouritesMoviesFromDB?.map((movie: any) => (
            <MovieCard
              favouritesMoviesFromDB={favouritesMoviesFromDB}
              key={movie.id}
              {...movie}
              isLoading={isLoading}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
