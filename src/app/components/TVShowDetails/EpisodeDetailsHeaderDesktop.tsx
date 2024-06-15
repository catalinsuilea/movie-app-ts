import React from "react";
import { Box, Flex, Heading, Text, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Episode } from "../../../types-modules/TvEpisodeDetails";

export const EpisodeDetailsHeaderDesktop = ({
  episodeData,
}: {
  episodeData: Episode;
}) => {
  const navigate = useNavigate();

  return (
    <Box
      position="relative"
      minHeight="100%"
      backgroundImage={`url(https://www.themoviedb.org/t/p/w780/${episodeData?.still_path})`}
      backgroundSize={{ base: "contain", md: "75% 100%" }}
      backgroundPosition={{ base: "top", md: "right center" }}
      backgroundRepeat="no-repeat"
      zIndex="1"
      opacity="1"
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "blue.500",
        opacity: { base: "0.6", md: "0.9" },
      }}
    >
      <Flex
        p="4"
        justifyContent="center"
        alignItems="center"
        position="relative"
        opacity="1"
        zIndex="6"
      >
        <Box
          p="4"
          display="flex"
          justifyContent="center"
          maxWidth="1250px"
          gap="3rem"
          color="#fff"
          zIndex="5"
        >
          <Box
            backgroundImage={`url(https://www.themoviedb.org/t/p/w780/${episodeData.still_path})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            borderRadius="md"
            width="100%"
          />
          <Flex flexDirection="column" gap="12px">
            <Heading mt="2" fontWeight="bold" fontSize="2xl">
              {episodeData.name}
            </Heading>
            <Text color="#fff">{episodeData.overview}</Text>
            <Text>Air Date: {episodeData.air_date}</Text>
            <Text>Runtime: {episodeData.runtime} minutes</Text>
            <Text>Vote Average: {episodeData.vote_average}</Text>
            <Text>Vote Count: {episodeData.vote_count}</Text>
            <Box mt="1">
              <Flex>
                {episodeData.crew.slice(0, 4).map((member, index) => (
                  <Flex
                    flexWrap="wrap"
                    key={member.credit_id}
                    mb="2"
                    alignItems="center"
                  >
                    <Box>
                      <Text
                        cursor="pointer"
                        onClick={() =>
                          navigate(`/person/${member.name}/${member.id}`)
                        }
                        fontWeight="bold"
                      >
                        {member.name}
                      </Text>
                      <Text>{member.job}</Text>
                    </Box>
                    {index < episodeData.crew.length - 1 && (
                      <Divider orientation="vertical" mx="4" height="auto" />
                    )}
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
