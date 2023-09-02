import React, { useState, useEffect } from "react";
import { Heading, Box, Flex, Image } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";
import { useFavourites } from "../../contexts/useFavouritesContext";
import addToFavouritesImg from "../../../images/addToFavouritesImg.jpg";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";

export const FavouritesPage = () => {
  const { favouritesMoviesFromDB } = useFavourites();
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useDeviceTypeContext();
  const moviesToShow = isMobile ? 2 : 3;

  useEffect(() => {
    if (favouritesMoviesFromDB) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [favouritesMoviesFromDB?.length]);

  return (
    <Box
      height={
        favouritesMoviesFromDB?.length < moviesToShow
          ? {
              xs: `${favouritesMoviesFromDB?.length < 1 ? "unset" : "870px"}`,
            }
          : {}
      }
    >
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
          <Image
            width={{ base: "auto", md: "410px", lg: "438px", xl: "615px" }}
            src={addToFavouritesImg}
            alt="Add to favourites image"
          />
        </Flex>
      ) : (
        <Box
          height={
            favouritesMoviesFromDB?.length < moviesToShow
              ? {
                  lg: `${
                    favouritesMoviesFromDB?.length < 3 ? "682px" : "unset"
                  }`,
                }
              : {}
          }
        >
          {favouritesMoviesFromDB?.map((movie: any) => (
            <MovieCard key={movie.id} {...movie} isLoading={isLoading} />
          ))}
        </Box>
      )}
    </Box>
  );
};
