import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";
import { PopularityStatus } from "../common/PopularityStatus";
import { FavouriteIcon } from "../common/FavouriteIcon";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { SignInModal } from "../Modal/SignInModal";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

export const PersonCardDetails = ({
  data,
  index,
  isMovieTVList = false,
  tabType = "",
}: any) => {
  const { authUser } = useAuthenticationContext();
  const { favouritesMoviesFromDB } = useFavourites();

  const [isFavourite, setIsFavourite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsFavourite(
      Boolean(
        favouritesMoviesFromDB?.find((movie: any) => movie.id === data.id)
      )
    );
  }, [favouritesMoviesFromDB, data.id]);

  const checkUserState = () => {
    if (authUser) return;
    setIsModalOpen(true);
  };

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const { handleFavourites, checkIsFavourite } = useFavourites();

  const navigate = useNavigate();
  return (
    <>
      <Box
        key={index}
        borderWidth={isMovieTVList ? "1px" : "0px"}
        borderRadius="md"
        p="2"
        mt={isMovieTVList ? "unset" : "2"}
        mr="2"
        flexShrink="0"
        maxWidth="150px"
        // overflow="hidden"
        _hover={{ cursor: "pointer", boxShadow: "0 0 6px 4px rgba(0,0,0,0.3)" }}
        boxShadow="1px 1px 6px 4px rgba(0, 0, 0, 0.1)"
        backgroundColor={isMovieTVList ? "black" : "transparent"}
        borderColor={isMovieTVList ? "black" : "transparent"}
        onClick={() => {
          navigate(
            `/${data.media_type || tabType}/${data.name || data.title}/${
              data.id
            }`
          );
        }}
        position="relative"
        pb="1rem"
      >
        <Image
          src={`https://www.themoviedb.org/t/p/w200/${
            data.poster_path || data.profile_path
          }`}
          alt={data.name}
        />
        <Text
          textAlign="center"
          maxWidth="150px"
          fontWeight="bold"
          padding="6px"
          color={isMovieTVList ? "#fff" : "black"}
          css={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.name || data.title}
        </Text>
        {data.media_type !== "person" && (
          <Box position="absolute" top="0" right="0" color="white">
            <FavouriteIcon
              isFavourite={isFavourite}
              checkUserState={checkUserState}
              handleFavourites={handleFavourites}
              checkIsFavourite={checkIsFavourite}
              data={data}
              media_type={data.media_type || tabType}
              id={data.id}
            />
          </Box>
        )}
        <Box position="absolute" bottom="-1.25rem" left="1rem">
          <PopularityStatus popularityValue={data.popularity} isMovieTVList />
        </Box>
        <SignInModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
      </Box>
    </>
  );
};
