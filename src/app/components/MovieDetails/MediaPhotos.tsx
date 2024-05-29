import React from "react";
import { Box, Heading, Text, AspectRatio, Image } from "@chakra-ui/react";

export const MediaPhotos = ({ photos }: any) => {
  return (
    <Box p={5}>
      <Box key={photos.id} mb={8}>
        <Heading as="h3" size="md" mb={2}>
          {photos.name}
        </Heading>
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
