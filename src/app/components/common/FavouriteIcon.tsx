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
}: any) => {
  return (
    <Icon
      as={isFavourite ? FaHeart : FaRegHeart}
      boxSize={isMovieDetails ? 10 : 6}
      mr={{ base: "unset", lg: "12px" }}
      mt={{ base: "unset", lg: "12px" }}
      cursor="pointer"
      color={`${isFavourite ? "red" : "white"}`}
      onClick={(e) => {
        e.stopPropagation();
        if (checkUserState) {
          checkUserState();
        }
        handleFavourites(data);
        checkIsFavourite(id);
      }}
    />
  );
};
