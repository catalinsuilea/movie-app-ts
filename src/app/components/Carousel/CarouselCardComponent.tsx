import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Link, Image, Icon } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { afterTheme, flexTheme } from "../../../styles/theme";
import ShowHideText from "./showHideText";
import { useNavigate } from "react-router-dom";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FavouriteIcon } from "../common/FavouriteIcon";
import { CarouselCardComponentTypes } from "../../../types-modules/HomepageTypes/HomepageTypes";

export const CarouselCardComponent = ({
  handleFavourites,
  checkUserState,
  favouritesMoviesFromDB,
  authUser,
  ...rest
}: CarouselCardComponentTypes) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { id, title, backdrop_path, poster_path, overview } = rest;

  useEffect(() => {
    if (!authUser) return;
    setIsFavourite(
      Boolean(favouritesMoviesFromDB?.find((movie) => +movie.id === id))
    );
  }, [favouritesMoviesFromDB, id, authUser]);

  const checkIsFavourite = (id: string | number) => {
    if (!authUser) return;
    const favouriteMovieObj = favouritesMoviesFromDB?.find(
      (movie) => movie.id === id
    );
    if (!favouriteMovieObj && !isFavourite) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  };

  useEffect(() => {
    if (!authUser) {
      setIsFavourite(false);
    }
  }, [authUser]);

  const navigate = useNavigate();
  const { isMobile, isTablet } = useDeviceTypeContext();

  const handleNavigate = (title: string | undefined, id: string) => {
    navigate(`/movie/${title}/${id}`);
  };

  return (
    <Box key={id} {...afterTheme.carousel} position="relative">
      <Flex
        zIndex="2"
        color="#fff"
        position="absolute"
        top="10px"
        fontSize="21px"
        justifyContent="space-between"
        alignItems={{ base: "start", md: "center" }}
        width="100%"
      >
        <Link ml="12px" onClick={() => handleNavigate(title, id.toString())}>
          {title}
          <ChevronRightIcon fontSize="27px" />
        </Link>
        <FavouriteIcon
          isFavourite={isFavourite}
          checkUserState={checkUserState}
          handleFavourites={handleFavourites}
          checkIsFavourite={checkIsFavourite}
          data={rest}
          media_type="movie"
          id={id}
        />
      </Flex>
      <Box
        {...flexTheme}
        height={`${isMobile || isTablet ? "370px" : "unset"}`}
        backgroundColor={{ base: "black", xl: "unset" }}
      >
        <Image src={`https://www.themoviedb.org/t/p/w780/${backdrop_path}`} />
      </Box>

      <Box
        zIndex="2"
        position="absolute"
        bottom="0"
        {...flexTheme}
        justifyContent="space-evenly"
        alignItems="start"
      >
        <Box>
          <Image
            width={{ base: "180px", lg: "90px" }}
            src={`https://www.themoviedb.org/t/p/w780/${poster_path}`}
            boxShadow="0 28px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
          />
        </Box>
        {isMobile || isTablet ? (
          <Text
            color="white"
            noOfLines={5}
            overflow="hidden"
            textOverflow="ellipsis"
            width="100%"
            m="0 6px 0 12px"
            onClick={() => handleNavigate(title, id.toString())}
          >
            {overview}
          </Text>
        ) : (
          <ShowHideText overview={overview} id={id.toString()} />
        )}
      </Box>
    </Box>
  );
};
