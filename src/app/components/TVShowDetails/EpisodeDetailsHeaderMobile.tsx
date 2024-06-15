import React from "react";
import { Box, Flex, Heading, Text, Divider, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Episode } from "../../../types-modules/TvEpisodeDetails";

export const EpisodeDetailsHeaderMobile = ({
  episodeData,
}: {
  episodeData: Episode;
}) => {
  const navigate = useNavigate();
  return (
    <Box position="relative" minHeight="100%">
      <Box
        backgroundImage={`url(https://www.themoviedb.org/t/p/w780/${episodeData?.still_path})`}
        backgroundSize={{ base: "cover", md: "75% 100%" }}
        backgroundPosition={{ base: "center", md: "right center" }}
        backgroundRepeat="no-repeat"
        height="300px"
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "blue.500",
          opacity: { base: "0.3", md: "0.9" },
        }}
      />

      <Flex
        p="4"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        bg="gray.900"
        color="#fff"
        zIndex="6"
      >
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
          maxWidth="1250px"
          zIndex="5"
        >
          <Flex
            flexDirection="column"
            gap="12px"
            mt={{ base: "4", md: "0" }}
            px={{ base: "2", md: "4" }}
          >
            <Heading
              mt="2"
              fontWeight="bold"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              {episodeData.name}
            </Heading>
            <Text>{episodeData.overview}</Text>
            <Text>
              Air Date:{" "}
              <Text as="span" fontWeight="bold">
                {episodeData.air_date}
              </Text>
            </Text>
            <Text>
              Runtime:{" "}
              <Text as="span" fontWeight="bold">
                {episodeData.runtime} minutes
              </Text>
            </Text>
            <Text>
              Vote Average:{" "}
              <Text fontWeight="bold" as="span">
                {" "}
                {episodeData.vote_average.toFixed(1)}⭐
              </Text>
            </Text>
            <Text>
              Vote Count:
              <Text as="span" fontWeight="bold">
                {" "}
                {episodeData.vote_count}
              </Text>
            </Text>
            <Box mt="1">
              <Flex flexDirection="column" gap="2">
                {episodeData.crew.slice(0, 4).map((member, index) => (
                  <Flex
                    key={member.credit_id}
                    alignItems="center"
                    justifyContent="space-between"
                    textAlign="left"
                  >
                    <Box>
                      <Link
                        color="blue.200"
                        cursor="pointer"
                        onClick={() =>
                          navigate(`/person/${member.name}/${member.id}`)
                        }
                        fontWeight="bold"
                      >
                        {member.name}
                      </Link>
                      <Text>{member.job}</Text>
                    </Box>
                    {index < episodeData.crew.length - 1 && (
                      <Divider
                        orientation="vertical"
                        mx="4"
                        height="auto"
                        display={{ base: "none", md: "block" }}
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
  );
};
