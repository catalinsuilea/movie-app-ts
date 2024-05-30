import { Icon } from "@chakra-ui/react";

import { FaHeart, FaRegHeart } from "react-icons/fa";

export const FavouriteIcon = ({
  isFavourite,
  checkUserState,
  handleFavourites,
  checkIsFavourite,
  id,
  data,
  isMovieDetails = false,
  isMovieCard = false,
  media_type,
}: any) => {
  const getFavouriteColor = (
    isFavourite: boolean,
    isMovieDetails: boolean,
    isMovieCard: boolean
  ) => {
    switch (true) {
      case isFavourite:
        return "red";
      case isMovieCard:
        return "black";
      case isMovieDetails === false:
        return "white";

      default:
        return "black";
    }
  };
  console.log("matatatatata", isMovieCard);
  return (
    <Icon
      as={isFavourite ? FaHeart : FaRegHeart}
      boxSize={isMovieDetails ? 10 : 6}
      mr={{ base: "unset", lg: "12px" }}
      mt={{ base: "unset", lg: "12px" }}
      cursor="pointer"
      color={getFavouriteColor(isFavourite, isMovieDetails, isMovieCard)}
      onClick={(e) => {
        e.stopPropagation();
        if (checkUserState) {
          checkUserState();
        }
        handleFavourites(data, media_type);
        checkIsFavourite(id);
      }}
    />
  );
};
