import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { PhotosTypes } from "../../../types-modules/MovieInfo";

export const MediaPhotos = ({
  photos,
  index,
}: {
  photos: PhotosTypes;
  index: number;
}) => {
  return (
    <Box p={5}>
      <Box key={`${photos.file_path}-${index}`} mb={8}>
        <Image
          key={photos.file_path}
          src={`https://image.tmdb.org/t/p/original${photos.file_path}`}
          alt={`Backdrop photos.file_path`}
          width="100%"
          height="auto"
        />
      </Box>
    </Box>
  );
};
