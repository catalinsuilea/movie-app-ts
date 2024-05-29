import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Box, Flex, Image, Icon, Link, Skeleton, Text } from "@chakra-ui/react";
import { MovieCardTheme } from "../../../styles/theme";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { MovieCardProps } from "../../../types-modules/MovieCardProps";
import { MovieProps } from "../../../types-modules/MovieProps";
import { getCardRoute, getMediaType } from "../../../utils/searchBard.utils";
import { FavouriteIcon } from "../common/FavouriteIcon";

const MovieCard = ({
  isModalOpen,
  onCloseModal,
  checkUserState,
  isLoading,
  favouritesMoviesFromDB,
  ...rest
}: any) => {
  const { isMobile } = useDeviceTypeContext();
  const {
    imgSrc,
    title,
    description,
    rating,
    releaseDate,
    id,
    vote_average,
    poster_path,
    release_date,
    overview,
    profile_path,
    original_name,
    media_type,
    popularity,
    gender,
  } = rest;

  console.log("mata", media_type);

  const { handleFavourites, checkIsFavourite, isFavourite, setIsFavourite } =
    useFavourites();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavourite(
      Boolean(favouritesMoviesFromDB?.find((movie: any) => movie.id === id))
    );
  }, [favouritesMoviesFromDB, id]);

  const onCardClick = (route: any) => {
    navigate(route);
  };

  return (
    <Skeleton
      isLoaded={!isLoading}
      display="flex"
      justifyContent="center"
      alignItems="center"
      data-testid="movie-card"
      margin="2.5em auto"
      w="100%"
    >
      <Link
        onClick={() =>
          onCardClick(getCardRoute(title || original_name, id, media_type))
        }
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box>
          <Box
            flexFlow={["column", "column", "column", "row"]}
            w={["90vw", "85vw"]}
            {...MovieCardTheme}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <Flex width="100%" flexDirection={{ base: "column", md: "row" }}>
                <Box justifyContent="center" alignItems="center" height="auto">
                  {" "}
                  <Image
                    width={{
                      base: "100%",
                      md: "350px",

                      xl: "200px",
                    }}
                    height={`${media_type === "person" ? "200px" : "unset"}`}
                    m="0"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius={{ base: "unset", md: "10px" }}
                    borderTopRightRadius={{ base: "10px", md: "unset" }}
                    src={
                      imgSrc || poster_path || profile_path
                        ? `https://www.themoviedb.org/t/p/w780/${
                            imgSrc || poster_path || profile_path
                          }`
                        : "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
                    }
                  />
                </Box>

                <Box
                  width={{ base: "auto", md: "100%" }}
                  m="12px"
                  textAlign="left"
                  textDecoration="none"
                >
                  {isMobile ? (
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box m="15px 0" fontSize="23px" fontWeight="500">
                        {title || original_name}
                      </Box>
                      {media_type !== "person" && (
                        <FavouriteIcon
                          isFavourite={isFavourite}
                          checkUserState={checkUserState}
                          handleFavourites={handleFavourites}
                          checkIsFavourite={checkIsFavourite}
                          data={rest}
                          id={id}
                        />
                      )}
                    </Flex>
                  ) : (
                    <Box m="15px 0" fontSize="23px" fontWeight="500">
                      {title || original_name}
                    </Box>
                  )}

                  <Box>{description || overview}</Box>
                  <Text mt="12px" fontWeight="500">
                    {getMediaType(media_type, gender)}
                  </Text>
                  <Box
                    fontWeight="bold"
                    m="15px 0"
                    fontSize={{ base: "21px", md: "19px" }}
                  >
                    {" "}
                    {media_type === "person" ? (
                      <Text fontWeight={400} fontSize="lg">
                        Popularity: ⭐{popularity.toFixed(1)}{" "}
                      </Text>
                    ) : (
                      <Text fontWeight={400} fontSize="lg">
                        ⭐{rating?.toFixed(1) || vote_average?.toFixed(1)}
                      </Text>
                    )}
                  </Box>
                  {media_type !== "person" && (
                    <Box>Release date: {releaseDate || release_date}</Box>
                  )}
                </Box>
                {!isMobile && media_type !== "person" && (
                  <Icon
                    as={isFavourite ? FaHeart : FaRegHeart}
                    boxSize={6}
                    mr="12px"
                    mt="12px"
                    cursor="pointer"
                    color={`${isFavourite ? "red" : "black"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (checkUserState) {
                        checkUserState();
                      }
                      handleFavourites(rest);
                      checkIsFavourite(id);
                    }}
                  />
                )}
              </Flex>
            )}
          </Box>
        </Box>
      </Link>
    </Skeleton>
  );
};
export default MovieCard;
