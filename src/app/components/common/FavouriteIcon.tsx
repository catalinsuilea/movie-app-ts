import { Icon } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavouriteIconTypes } from "../../../types-modules/Favourites/FavouritesTypes";

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
}: FavouriteIconTypes) => {
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

  return (
    <Icon
      as={isFavourite ? FaHeart : FaRegHeart}
      boxSize={isMovieDetails ? 10 : 6}
      mr="12px"
      mt="12px"
      cursor="pointer"
      color={getFavouriteColor(isFavourite, isMovieDetails, isMovieCard)}
      onClick={(e) => {
        e.stopPropagation();
        if (checkUserState) {
          checkUserState("favourites");
        }
        handleFavourites(data, media_type);
        checkIsFavourite(id);
      }}
    />
  );
};
