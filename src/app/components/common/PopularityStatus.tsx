import React from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from "@chakra-ui/react";
export const PopularityStatus = ({ popularityValue }: any) => {
  const normalizeValue = Math.min(
    100,
    Math.round((popularityValue / 2000) * 100)
  );

  console.log("hey", popularityValue);
  return (
    <Flex alignItems="center" gap="8px">
      <CircularProgress
        position="relative"
        size="75px"
        value={normalizeValue}
        color="green.400"
      >
        <CircularProgressLabel>
          <Flex justifyContent="center" alignItems="center" flexDirection="row">
            <Text fontSize="19px" fontWeight="bold">
              {normalizeValue}
            </Text>
            <Text mb="4px" fontSize="10px">
              %
            </Text>
          </Flex>
        </CircularProgressLabel>
      </CircularProgress>
      <Box>
        <Text fontSize="18px" fontWeight="bold" width="min-content">
          User Score
        </Text>
      </Box>
    </Flex>
  );
};
