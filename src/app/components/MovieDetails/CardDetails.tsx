import React from "react";
import Cast from "../../../types-modules/Cast";
import { MovieDetailsTheme } from "../../../styles/theme";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CardDetails = ({ cast }: any) => {
  const navigate = useNavigate();
  return (
    <Box width={{ base: "95%", lg: "85%" }} textAlign="left">
      <Box {...MovieDetailsTheme.charactersCardsContainer}>
        {cast?.map((item: Cast) => (
          <Box
            {...MovieDetailsTheme.charcacterCard}
            onClick={() => {
              navigate(`/person/${item.name}/${item.id}`);
            }}
          >
            <Box {...MovieDetailsTheme.img}>
              <Image
                borderTopLeftRadius="15px"
                borderTopRightRadius="15px"
                height="250px"
                src={
                  item.profile_path
                    ? `https://www.themoviedb.org/t/p/w780/${item.profile_path}`
                    : "https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man-300x284.jpg"
                }
                alt="character-img"
              ></Image>
            </Box>
            <Flex {...MovieDetailsTheme.characterNames}>
              <Box>
                <Text fontWeight="500">{item.name}</Text>
              </Box>
              <Box>
                <Text noOfLines={1} fontSize="14px">
                  {item.character}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
