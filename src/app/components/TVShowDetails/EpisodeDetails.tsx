import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Heading,
  VStack,
  HStack,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import {
  GuestStar,
  CrewMember,
  Episode,
} from "../../../types-modules/TvEpisodeDetails";
import { MovieDetailsTheme } from "../../../styles/theme";

export const EpisodeDetails = ({}: any) => {
  const API_KEY = "380f962505ebde6dee08b0b646fe05f1";
  const { seriesSeason, seriesEpisode, id } = useParams();
  const [episodeData, setEpisodeData] = useState<Episode | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEpisodeDetails = async () => {
      const URL = `https://api.themoviedb.org/3/tv/${id}/season/${seriesSeason}/episode/${seriesEpisode}?api_key=${API_KEY}`;
      try {
        const response = await fetch(URL, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }
        const data = await response.json();
        setEpisodeData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getEpisodeDetails();
  }, [seriesSeason, seriesEpisode, id]);

  return (
    episodeData && (
      <Box pt={4}>
        <Box
          position="relative"
          minHeight="100%"
          backgroundImage={`url(https://www.themoviedb.org/t/p/w780/${episodeData?.still_path})`}
          backgroundSize="75% 100%"
          backgroundPosition="right center"
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
            opacity: 0.9,
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
                          <Divider
                            orientation="vertical"
                            mx="4"
                            height="auto"
                          />
                        )}
                      </Flex>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Divider my="4" />

        <Box p="4" display="flex" justifyContent="center">
          <Box maxWidth="1250px" width="100%">
            <Box>
              <Heading size="md" mb="2">
                Guest Stars
              </Heading>
              <Flex width={{ base: "95%", lg: "100%" }} textAlign="left">
                <Box
                  css={{ ...MovieDetailsTheme.customScrollBar }}
                  {...MovieDetailsTheme.charactersCardsContainer}
                >
                  {episodeData.guest_stars.map((member: GuestStar) => (
                    <Box
                      {...MovieDetailsTheme.charcacterCard}
                      onClick={() => {
                        navigate(`/person/${member.name}/${member.id}`);
                      }}
                    >
                      <Box {...MovieDetailsTheme.img}>
                        <Image
                          borderTopLeftRadius="15px"
                          borderTopRightRadius="15px"
                          height="250px"
                          src={
                            member.profile_path
                              ? `https://www.themoviedb.org/t/p/w780/${member.profile_path}`
                              : "https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man-300x284.jpg"
                          }
                          alt="character-img"
                        ></Image>
                      </Box>
                      <Flex {...MovieDetailsTheme.characterNames}>
                        <Box>
                          <Text fontWeight="500">{member.name}</Text>
                        </Box>
                        <Box>
                          <Text noOfLines={1} fontSize="14px">
                            {member.name}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};
