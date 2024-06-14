import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from "@chakra-ui/react";

export const PopularityStatus = ({
  popularityValue,
  rating,
  isMovieTVList = false,
}: any) => {
  const value = rating || popularityValue;

  const normalizeValue = Math.min(
    100,
    Math.round((value / rating ? 5 : 2000) * 100)
  );

  return (
    <Flex alignItems="center" gap="8px" zIndex="4">
      <CircularProgress
        position="relative"
        size={isMovieTVList ? "45px" : "75px"}
        value={normalizeValue}
        color="green.400 !important"
      >
        <CircularProgressLabel>
          <Box
            width={isMovieTVList ? "34px" : "54px"}
            height={isMovieTVList ? "34px" : "54px"}
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            backgroundColor="black"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              color="#fff"
            >
              <Text
                fontSize={isMovieTVList ? "11px" : "19px"}
                fontWeight="bold"
              >
                {normalizeValue}
              </Text>
              <Text mb="4px" fontSize="10px">
                %
              </Text>
            </Flex>
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
      {!isMovieTVList && (
        <Box>
          <Text
            color="#fff"
            fontSize={{ base: "16px", md: "22px" }}
            fontWeight="bold"
            width="min-content"
          >
            User Score
          </Text>
        </Box>
      )}
    </Flex>
  );
};
