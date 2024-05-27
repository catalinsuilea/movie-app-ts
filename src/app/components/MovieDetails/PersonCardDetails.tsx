import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";

export const PersonCardDetails = ({ data, index }: any) => {
  const navigate = useNavigate();
  return (
    <Box
      key={index}
      borderWidth="1px"
      borderRadius="md"
      p="2"
      mt="2"
      mr="2"
      flexShrink="0"
      maxWidth="150px"
      overflow="hidden"
      _hover={{ cursor: "pointer" }}
      boxShadow="1px 1px 6px 4px rgba(0, 0, 0, 0.1)"
      onClick={() => {
        navigate(`/movie/${data.name || data.title}/${data.id}`);
      }}
    >
      <Image
        src={`https://www.themoviedb.org/t/p/w200/${data.poster_path}`}
        alt={data.name}
      />
      <Text
        textAlign="center"
        maxWidth="150px"
        fontWeight="bold"
        padding="6px"
        css={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.name || data.title}
      </Text>
    </Box>
  );
};
