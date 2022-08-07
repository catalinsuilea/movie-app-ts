import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";
import Cast from "../../../types-modules/Cast";
import Crew from "../../../types-modules/Crew";
import MovieInfo from "../../../types-modules/MovieInfo";
import { Box, Flex, Image } from "@chakra-ui/react";
interface CastInfo {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
}
const MovieDetails = () => {
  const { id } = useParams();
  const [castInfo, setCastInfo] = useState<CastInfo>({
    id: undefined,
    cast: undefined,
    crew: undefined,
  });
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  console.log(id);
  useEffect(() => {
    const fetchCastInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
      );
      const data = await res.data;
      console.log(data);
      setCastInfo(data);
    };
    fetchCastInfo();
  }, []);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US`
      );
      const data = await res.data;
      console.log(data);
      setMovieInfo(data);
    };
    fetchMovieInfo();
  }, []);
  console.log(castInfo);
  const { cast, crew } = castInfo;
  console.log(cast);

  return (
    <div>
      <Box
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w780/${movieInfo?.poster_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          zIndex: "-1",
        }}
        position="relative"
        _after={{
          content: `""`,
          position: "absolute",
          width: "100%",
          height: "100%",
          bg: "black",
          top: "0",
          left: "0",
          right: "0",
          opacity: "0.7",
          zIndex: "-1",
        }}
      >
        <Box
          display="flex"
          position="relative"
          width="100%"
          alignItems="center"
          color="#fff"
          // flexFlow={["column", "column", "column", "column"]}
        >
          <div className="img-movie-description">
            <Image
              m="0 10px"
              width="40vw"
              src={`https://www.themoviedb.org/t/p/w780/${movieInfo?.backdrop_path}`}
            />
          </div>
          <div className="movie-info">
            <h1>
              {movieInfo?.title}{" "}
              {`(${movieInfo?.release_date?.split("-").slice(0, 1)})`}{" "}
            </h1>
            <div className="movie-details">
              <span>PG</span>
              <p className="release-date">{movieInfo?.release_date} </p>
              {`(${movieInfo?.original_language?.toUpperCase()})`}
              <li>
                {movieInfo?.genres?.map((genre) => (
                  <span className="genres">{genre.name},</span>
                ))}
              </li>
            </div>
            <span className="tagline space">{movieInfo?.tagline}</span>
            <span className="overview-title space">Overview</span>
            <p className="overview-content space">{movieInfo?.overview}</p>
            <div className="movie-crew space">
              {crew?.map((member: Crew, i: number) =>
                i >= 4 ? (
                  ""
                ) : (
                  <div className="crew">
                    <span>{member.original_name}</span>
                    <small>{member.job}</small>
                  </div>
                )
              )}
            </div>
          </div>
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
        <div className="cast">
          <h2>Top Billed Cast</h2>
          <Box className="characters-cards-container">
            {cast?.map((item: Cast) => (
              <div className="charcacter-card">
                <div className="character-img">
                  <img
                    src={
                      item.profile_path
                        ? `https://www.themoviedb.org/t/p/w780/${item.profile_path}`
                        : "https://www.dcrc.co/wp-content/uploads/2019/04/blank-head-profile-pic-for-a-man.jpg"
                    }
                  ></img>
                </div>
                <div className="character-names">
                  <div>
                    {" "}
                    <span className="character-real-name">{item.name}</span>
                  </div>
                  <div>
                    <span className="character-movie-name">
                      {item.character}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            ;
          </Box>
        </div>
        <div className="revenue-and-about">
          <div className="data">
            <div>
              <span>Status</span> <p>{movieInfo?.status}</p>
            </div>
            <div>
              <span>Original Language</span>{" "}
              <p>{movieInfo?.original_language?.toUpperCase()}</p>
            </div>
            <div>
              <span>Release date:</span>
              <p>{movieInfo?.release_date}</p>
            </div>
            <div>
              <span>Budget</span>
              <p>{`$${movieInfo?.budget}`}</p>
            </div>
            <div>
              <span>Revenue</span>
              <p>{`$${movieInfo?.revenue}`}</p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
export default MovieDetails;
