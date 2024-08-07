import React, { useState } from "react";
import { Box, Heading, Text, AspectRatio } from "@chakra-ui/react";
import { TrailersTypes } from "../../../types-modules/MovieInfo";

export const Trailers = ({ trailer }: { trailer: TrailersTypes }) => {
  const [error, setError] = useState("");
  return (
    <Box p={4}>
      <Box key={trailer.id} mb={10}>
        <Heading noOfLines={1} as="h3" size="md" mb={2}>
          {trailer.name}
        </Heading>
        <Text mb={2}>
          Published on: {new Date(trailer.published_at).toLocaleDateString()}
        </Text>
        <AspectRatio ratio={16 / 9}>
          <iframe
            title={trailer.name}
            src={`https://www.youtube.com/embed/${trailer.key}?rel=0&enablejsapi=1&origin=${window.location.origin}&host=https://www.youtube-nocookie.com`}
            allowFullScreen
            onError={() =>
              setError(
                "Failed to load trailer. Please check your ad blocker settings."
              )
            }
            sandbox="allow-same-origin allow-scripts"
          />
        </AspectRatio>
      </Box>
      <Box>
        <Text fontSize="2xl" color="red">
          {error}
        </Text>
      </Box>
    </Box>
  );
};
