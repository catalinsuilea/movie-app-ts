import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Image, VStack, HStack, Flex } from "@chakra-ui/react";
import { PersonCardDetails } from "./PersonCardDetails";
import { MovieDetailsTheme } from "../../../styles/theme";
import { PersonActingCredits } from "./PersonActingCredits";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";

export const PersonDetails = ({}) => {
  const { id } = useParams();
  const [personDetails, setPersonDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const { isMobile } = useDeviceTypeContext();
  const API_KEY = process.env.REACT_APP_MOVIEDB_KEY;

  useEffect(() => {
    const getPersonData = async () => {
      try {
        const PERSON_URL = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`;
        const response = await fetch(PERSON_URL, {
          method: "GET",
        });
        if (!response.ok) {
          setPersonDetails(null);
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setPersonDetails(data);
      } catch (err) {
        console.error(err);
      }
    };
    getPersonData();
  }, [id]);

  useEffect(() => {
    const getPersonTvCredits = async () => {
      try {
        const TV_CREDITS_URL = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${API_KEY}`;
        const response = await fetch(TV_CREDITS_URL, {
          method: "GET",
        });
        if (!response.ok) {
          setTvCredits([]);
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setTvCredits(data.cast);
      } catch (err) {
        console.error(err);
      }
    };
    getPersonTvCredits();
  }, [id]);

  useEffect(() => {
    const getPersonMovieCredits = async () => {
      try {
        const MOVIE_CREDITS_URL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`;
        const response = await fetch(MOVIE_CREDITS_URL, {
          method: "GET",
        });
        if (!response.ok) {
          setMovieCredits([]);
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setMovieCredits(data.cast);
      } catch (err) {
        console.error(err);
      }
    };
    getPersonMovieCredits();
  }, [id]);

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(personDetails?.birthday);

  const sortedMovies = [...movieCredits].sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );

  return (
    <Box p="4" display="flex" justifyContent="center">
      <Box maxWidth="1250px" width="100%">
        {personDetails && movieCredits && tvCredits && (
          <Flex
            align="flex-start"
            justify="space-evenly"
            width="100%"
            gap="1.5rem"
            flexDirection={isMobile ? "column" : "row"}
          >
            {/* Left Container for Image */}
            <Flex flexDirection="column" margin="0 auto" alignItems="center">
              <Image
                src={`https://www.themoviedb.org/t/p/w780/${personDetails?.profile_path}`}
                alt={personDetails?.name}
                borderRadius="md"
              />
              <Flex width="100%" flexDirection="column" gap="8px">
                <Text mt="2" fontWeight="bold" fontSize="lg">
                  Personal Info
                </Text>
                <VStack align="start">
                  <Flex flexDirection="column" gap="12px">
                    <Text mb="2">
                      <Text fontWeight="bold">Known For:</Text>{" "}
                      {personDetails?.known_for_department}
                    </Text>
                    <Text mb="2">
                      <Text fontWeight="bold">Gender:</Text>{" "}
                      {personDetails?.gender === 1 ? "Female" : "Male"}
                    </Text>
                    <Text mb="2">
                      <Text fontWeight="bold">Place of Birth:</Text>{" "}
                      {personDetails?.place_of_birth}
                    </Text>
                    <Text mb="2">
                      <Text fontWeight="bold">Birthday:</Text>
                      {new Date(personDetails?.birthday).toLocaleDateString()} (
                      {age} years old)
                    </Text>
                    <Text mb="2">
                      <Text fontWeight="bold">Also known as:</Text>{" "}
                      {personDetails?.also_known_as.join(", ")}
                    </Text>
                    <Text mb="2">
                      {" "}
                      <Text fontWeight="bold">Popularity:</Text>{" "}
                      {personDetails?.popularity}
                    </Text>
                    {personDetails?.homepage && (
                      <Text mb="2">
                        <Text fontWeight="bold">Homepage:</Text>{" "}
                        <a
                          href={personDetails?.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {personDetails?.homepage}
                        </a>
                      </Text>
                    )}
                  </Flex>
                </VStack>
              </Flex>
            </Flex>

            {/* Right Container for Details */}
            <Box
              maxWidth={{ base: "95%", md: "50%", xl: "85%" }}
              ml="4"
              flex="1"
            >
              <Text mt="2" fontWeight="bold" fontSize="3xl">
                {personDetails.name}
              </Text>

              <Text m="12px 0" fontWeight="bold" fontSize="xl">
                Biography
              </Text>
              <Text mb="4"> {personDetails.biography}</Text>

              {/* Container for Movie and TV Credits */}
              <Text fontWeight="bold" fontSize="xl">
                Known for
              </Text>
              <Flex overflowX="auto" position="relative" w="100%" mt="4">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  bottom="42px"
                  w="20px"
                  zIndex="1"
                  pointerEvents="none"
                  css={{
                    backdropFilter: "blur(10px)",
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  }}
                />

                <Flex
                  css={MovieDetailsTheme.customScrollBar}
                  w="100%"
                  pr={{ xs: "unset", md: "20px" }}
                  pl={{ xs: "unset", md: "20px" }}
                  pb="2.25rem"
                  overflowX="scroll"
                >
                  {movieCredits.map((movie, index) => (
                    <PersonCardDetails
                      tabType="movie"
                      data={movie}
                      index={index}
                    />
                  ))}
                  {tvCredits?.map((tvCredit, index) => (
                    <PersonCardDetails
                      tabType="tv"
                      data={tvCredit}
                      index={index}
                    />
                  ))}
                </Flex>
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  bottom="42px"
                  w="20px"
                  zIndex="1"
                  pointerEvents="none"
                  css={{
                    backdropFilter: "blur(10px)",
                    background:
                      "linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  }}
                />
              </Flex>
              <PersonActingCredits sortedMovies={sortedMovies} />
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};
