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
import { UserReviews } from "../RatingAndReviews/UserReviews";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { EpisodeDetailsHeaderDesktop } from "./EpisodeDetailsHeaderDesktop";
import { EpisodeDetailsHeaderMobile } from "./EpisodeDetailsHeaderMobile";

export const EpisodeDetails = ({}: any) => {
  const API_KEY = "380f962505ebde6dee08b0b646fe05f1";
  const { seriesSeason, seriesEpisode, id } = useParams();
  const [episodeData, setEpisodeData] = useState<Episode | null>(null);
  const navigate = useNavigate();
  const { isDesktop, isTablet, isMobile } = useDeviceTypeContext();

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
      <Box>
        {(isDesktop || isTablet) && (
          <EpisodeDetailsHeaderDesktop episodeData={episodeData} />
        )}
        {isMobile && <EpisodeDetailsHeaderMobile episodeData={episodeData} />}

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
        <UserReviews
          mediaData={episodeData}
          mediaId={id}
          mediaType="episode"
          season={seriesSeason}
          episode={seriesEpisode}
        />
      </Box>
    )
  );
};
