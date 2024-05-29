import React from "react";
import { Box, Heading, Text, AspectRatio } from "@chakra-ui/react";

export const Trailers = ({ trailer }: any) => {
  return (
    <Box p={5}>
      <Box key={trailer.id} mb={8}>
        <Heading as="h3" size="md" mb={2}>
          {trailer.name}
        </Heading>
        <Text mb={2}>
          Published on: {new Date(trailer.published_at).toLocaleDateString()}
        </Text>
        <AspectRatio ratio={16 / 9}>
          <iframe
            title={trailer.name}
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
          />
        </AspectRatio>
      </Box>
    </Box>
  );
};
