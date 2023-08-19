import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cast from "../../../types-modules/Cast";
import Crew from "../../../types-modules/Crew";
import MovieInfo from "../../../types-modules/MovieInfo";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import {
  afterTheme,
  flexTheme,
  MovieDetailsTheme,
} from "../../../styles/theme";
interface CastInfo {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
}
const MovieDetails = () => {
  const { id } = useParams();
  const [castInfo, setCastInfo] = useState<CastInfo>({});
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);

  useEffect(() => {
    const fetchCastInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
      );
      const data = await res.data;
      setCastInfo(data);
    };
    fetchCastInfo();
  }, [id]);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
      );
      const data = await res.data;
      setMovieInfo(data);
    };
    fetchMovieInfo();
  }, [id]);

  const { cast, crew } = castInfo;

  return (
    <Box>
      <Box
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w780/${movieInfo?.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          zIndex: "-1",
        }}
        position="relative"
        {...afterTheme.demo}
      >
        <Box
          {...flexTheme}
          position="relative"
          width="100%"
          color="#fff"
          // flexFlow={["column", "column", "column", "column"]}
        >
          <Box {...MovieDetailsTheme.imgMovieDescription}>
            <Image
              width={{ base: "200px", md: "400px" }}
              m="0 10px"
              src={`https://www.themoviedb.org/t/p/w780/${movieInfo?.poster_path}`}
              alt="movie-original-poster"
            />
          </Box>
          <Box {...MovieDetailsTheme.movieInfo}>
            <Heading>
              {movieInfo?.title}{" "}
              {`(${movieInfo?.release_date?.split("-").slice(0, 1)})`}{" "}
            </Heading>
            <Box {...MovieDetailsTheme.movieDetails}>
              <Text>PG</Text>
              <Text m="0 5px">{movieInfo?.release_date} </Text>
              {`(${movieInfo?.original_language?.toUpperCase()})`}
              <Flex>
                {movieInfo?.genres?.map((genre) => (
                  <Text m="0 5px">{genre.name},</Text>
                ))}
              </Flex>
            </Box>
            <Text mt="16px">{movieInfo?.tagline}</Text>
            <Text mt="16px">Overview</Text>
            <Text mt="12px">{movieInfo?.overview}</Text>
            <Flex mt="16px" {...MovieDetailsTheme.movieCrew}>
              {crew?.map((member: Crew, i: number) =>
                i >= 6 ? (
                  ""
                ) : (
                  <Box {...MovieDetailsTheme.crew}>
                    <Text fontWeight="bold">{member.original_name}</Text>
                    <Text>{member.job}</Text>
                  </Box>
                )
              )}
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justify-content="flex-start"
        align-items="center"
        width="90%"
        margin="30px auto"
        flexFlow={{ xs: "column", md: "row !important" }}
      >
        <Box width="80%" textAlign="left">
          <h2>Top Billed Cast</h2>
          <Box {...MovieDetailsTheme.charactersCardsContainer}>
            {cast?.map((item: Cast) => (
              <Box {...MovieDetailsTheme.charcacterCard}>
                <Box {...MovieDetailsTheme.img}>
                  <Image
                    borderTopLeftRadius="15px"
                    borderTopRightRadius="15px"
                    src={
                      item.profile_path
                        ? `https://www.themoviedb.org/t/p/w780/${item.profile_path}`
                        : "https://www.dcrc.co/wp-content/uploads/2019/04/blank-head-profile-pic-for-a-man.jpg"
                    }
                    alt="character-img"
                  ></Image>
                </Box>
                <Box
                  {...MovieDetailsTheme.charcacterNames}
                  textAlign="center"
                  height="65px"
                >
                  <Box>
                    <Text fontWeight="500">{item.name}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="14px">{item.character}</Text>
                  </Box>
                </Box>
              </Box>
            ))}
            ;
          </Box>
        </Box>
        <Box ml="50px" textAlign="left" mt="24px">
          <Box>
            <Text mt="6px" fontWeight="bold">
              Status
            </Text>
            <Text>{movieInfo?.status}</Text>
            <Box>
              <Text mt="6px" fontWeight="bold">
                Original Language
              </Text>{" "}
              <Text>{movieInfo?.original_language?.toUpperCase()}</Text>
            </Box>
            <Box>
              <Text mt="6px" fontWeight="bold">
                Release date:
              </Text>
              <Text>{movieInfo?.release_date}</Text>
            </Box>
            <Box>
              <Text mt="6px" fontWeight="bold">
                Budget
              </Text>
              <Text>{`$${movieInfo?.budget}`}</Text>
            </Box>
            <Box>
              <Text mt="6px" fontWeight="bold">
                Revenue
              </Text>
              <Text>{`$${movieInfo?.revenue}`}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MovieDetails;
