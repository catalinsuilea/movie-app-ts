import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";
import { PopularityStatus } from "../common/PopularityStatus";

export const PersonCardDetails = ({
  data,
  index,
  isMovieTVList = false,
  tabType = "",
}: any) => {
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
        <Box position="absolute" bottom="-1.25rem" left="1rem">
          <PopularityStatus popularityValue={data.popularity} isMovieTVList />
        </Box>
      </Box>
    </>
  );
};
