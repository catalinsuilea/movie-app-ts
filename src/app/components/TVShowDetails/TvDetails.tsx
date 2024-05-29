import React, { useEffect, useState } from "react";
import { Box, Image, Text, Flex, Divider } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { SeasonData } from "../../../types-modules/TvTypes";
import { MovieDetailsTheme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";

export const TVShowDetails = ({ data, seriesId }: any) => {
  const API_KEY = "380f962505ebde6dee08b0b646fe05f1";
  //   const URL = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}?api_key=${API_KEY}`;
  const [seasonData, setSeasonData] = useState<SeasonData>({});
  const [seasonNumber, setSeasonNumber] = useState(1);
  const navigate = useNavigate();
  const getSeasonEpisodes = async (series_id: number, season_number: any) => {
    const URL = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${API_KEY}`;
    try {
      const response = await fetch(URL, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status}`);
      }
      const data = await response.json();
      setSeasonData((prev: any) => ({
        ...prev,
        [season_number]: { episodes: data.episodes },
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSeasonEpisodes(seriesId, 1);
  }, []);

  const handleClick = (
    seriesName: string,
    seriesSeason: number,
    seriesEpisode: number,
    id: number
  ) => {
    navigate(`/tv/${seriesName}/${seriesSeason}/${seriesEpisode}/${id}`);
  };

  return (
    data && (
      <Box p="4">
        <Box mb="4">
          <Text fontSize="xl">Seasons: {data.number_of_seasons}</Text>
          <Text fontSize="xl"> Episodes: {data.number_of_episodes}</Text>
        </Box>
        <Divider mt="4" />
        <Tabs mt="4" size="md" variant="enclosed">
          <TabList
            overflowX="auto"
            width="100%"
            css={{ ...MovieDetailsTheme.customScrollBar }}
          >
            {data.seasons
              .filter((season: any) => season.name !== "Specials")
              .map((season: any, index: any) => (
                <Tab
                  m="0.75rem 0"
                  borderWidth="1.5px"
                  cursor="pointer"
                  key={season.id}
                  onClick={() => {
                    getSeasonEpisodes(seriesId, index + 1);
                    setSeasonNumber(index + 1);
                  }}
                >
                  <Text fontWeight="600"> {season.name}</Text>
                </Tab>
              ))}
          </TabList>
          <TabPanels>
            {data.seasons
              .filter((season: any) => season.name !== "Specials")
              .map((season: any, index: any) => (
                <TabPanel key={season.id}>
                  <Text mb="3" fontSize="2xl" fontWeight="bold">
                    Plot
                  </Text>{" "}
                  <Text
                    fontSize="md"
                    letterSpacing="1.025px"
                    mb="3"
                    fontWeight="400"
                  >
                    {" "}
                    {season.overview}
                  </Text>
                  <Flex
                    css={{ ...MovieDetailsTheme.customScrollBar }}
                    overflowX="auto"
                  >
                    {seasonData[`${index + 1}`]?.episodes?.map(
                      (episode: any, episodeIndex: number) => (
                        <Card
                          onClick={() =>
                            handleClick(
                              data.name,
                              seasonNumber,
                              episodeIndex + 1,
                              seriesId
                            )
                          }
                          key={episodeIndex}
                          minWidth="200px"
                          mr="4"
                          cursor="pointer"
                        >
                          <CardHeader mt="0.75rem">
                            <Text fontWeight="bold">
                              Episode {episodeIndex + 1}
                            </Text>
                          </CardHeader>
                          <CardBody m="1rem 0">
                            <Image
                              _hover={{
                                boxShadow: "0 0 6px 4px rgba(0,0,0,0.3)",
                              }}
                              src={`https://www.themoviedb.org/t/p/w200/${episode?.still_path}`}
                              alt={`Episode ${episodeIndex + 1}`}
                              borderRadius="md"
                              width="100%"
                              height="auto"
                            />
                            <Text mt="2">Air Date: {episode?.air_date}</Text>
                            <Text fontWeight="bold" mt="2">
                              ⭐ {episode?.vote_average?.toFixed(1)}
                            </Text>
                          </CardBody>
                        </Card>
                      )
                    )}
                  </Flex>
                </TabPanel>
              ))}
          </TabPanels>
        </Tabs>
      </Box>
    )
  );
};
