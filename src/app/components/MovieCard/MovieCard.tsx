import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Box, Flex, Image, Link, Skeleton, Text } from "@chakra-ui/react";
import { MovieCardTheme } from "../../../styles/theme";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { useNavigate } from "react-router-dom";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { MovieCardProps } from "../../../types-modules/MovieCardProps";
import { getCardRoute, getMediaType } from "../../../utils/searchBard.utils";
import { FavouriteIcon } from "../common/FavouriteIcon";

const MovieCard = ({
  isModalOpen,
  onCloseModal,
  checkUserState,
  isLoading,
  favouritesWithPagination,
  media_type_header = "",
  ...rest
}: MovieCardProps) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { isMobile } = useDeviceTypeContext();
  const { handleFavourites, checkIsFavourite, favouritesMoviesFromDB } =
    useFavourites();
  const navigate = useNavigate();

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

  const favouritesData =
    favouritesMoviesFromDB.length === 0
      ? favouritesWithPagination
      : favouritesMoviesFromDB;
  useEffect(() => {
    setIsFavourite(
      Boolean(favouritesData?.find((movie) => movie.id === Number(id)))
    );
  }, [favouritesData, id]);

  const onCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <Skeleton
      isLoaded={!isLoading}
      display="flex"
      justifyContent="center"
      alignItems="center"
      data-testid="movie-card"
      margin={media_type_header === "person" ? "unset" : "2.5em auto"}
    >
      <Link
        width="100%"
        onClick={() =>
          onCardClick(
            getCardRoute(
              title || original_name,
              id,
              media_type || media_type_header
            )
          )
        }
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box>
          <Box
            flexFlow={["column", "column", "column", "row"]}
            width="100%"
            {...MovieCardTheme}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <Flex flexDirection={{ base: "column", md: "row" }} width="100%">
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
                      <Flex
                        m="15px 0"
                        fontSize="23px"
                        fontWeight="500"
                        flexDirection={{ base: "column", md: "row" }}
                      >
                        <Text width="100%">{title || original_name}</Text>
                        <Box>
                          {media_type || media_type_header ? (
                            <Text fontWeight={400} fontSize="lg">
                              ⭐{popularity?.toFixed(1) || rating?.toFixed(1)}{" "}
                            </Text>
                          ) : (
                            rating ||
                            (vote_average && (
                              <Text fontWeight={400} fontSize="lg">
                                ⭐
                                {rating?.toFixed(1) || vote_average?.toFixed(1)}
                              </Text>
                            ))
                          )}
                        </Box>
                      </Flex>
                      {media_type !== "person" &&
                        media_type_header !== "person" && (
                          <FavouriteIcon
                            isFavourite={isFavourite}
                            checkUserState={checkUserState}
                            handleFavourites={handleFavourites}
                            checkIsFavourite={checkIsFavourite}
                            data={rest}
                            id={id}
                            media_type={
                              media_type || media_type_header || "movie"
                            }
                            isMovieCard
                          />
                        )}
                    </Flex>
                  ) : (
                    <Flex
                      alignItems="start"
                      m="15px 0"
                      fontSize="23px"
                      fontWeight="500"
                      gap="8px"
                    >
                      {title || original_name}

                      <Box>
                        {(media_type === "person" || media_type_header) &&
                        rating ? (
                          <Text fontWeight={400} fontSize="lg">
                            ⭐{popularity.toFixed(0)}{" "}
                          </Text>
                        ) : (
                          rating ||
                          (vote_average && (
                            <Text mt="2px" fontWeight={600} fontSize="xl">
                              ⭐{rating?.toFixed(1) || vote_average?.toFixed(1)}
                            </Text>
                          ))
                        )}
                      </Box>
                    </Flex>
                  )}
                  <Box>
                    <Text
                      noOfLines={3}
                      css={{
                        textOverflow: "ellipsis",
                      }}
                    >
                      {description || overview}
                    </Text>
                  </Box>
                  <Text mt="12px" fontWeight="500">
                    {getMediaType(media_type || media_type_header, gender)}
                  </Text>
                  <Box
                    fontWeight="bold"
                    m="15px 0"
                    fontSize={{ base: "21px", md: "19px" }}
                  >
                    {" "}
                  </Box>
                  {media_type !== "person" &&
                    media_type_header !== "person" && (
                      <Box>Release date: {releaseDate || release_date}</Box>
                    )}
                </Box>
                {!isMobile && media_type_header !== "person" && (
                  <FavouriteIcon
                    isFavourite={isFavourite}
                    checkUserState={checkUserState}
                    handleFavourites={handleFavourites}
                    checkIsFavourite={checkIsFavourite}
                    data={rest}
                    id={id}
                    media_type={media_type || "movie"}
                    isMovieCard
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
