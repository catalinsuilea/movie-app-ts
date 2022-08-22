import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Movies from "../../../types-modules/movies";
const GetMovies = () => {
  const [movies, setMovie] = useState<Movies[]>([]);
  console.log(movies);
  const { genreID } = useParams();
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=380f962505ebde6dee08b0b646fe05f1&with_genres=${genreID}`
      );
      const data = await res.data;
      console.log(data);
      setMovie(data.results);
    };
    fetchMovies();
  }, [genreID]);
  return (
    <div>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          imgSrc={movie.poster_path}
          title={movie.title}
          description={movie.overview}
          rating={movie.vote_average}
          releaseDate={movie.release_date}
          id={movie.id}
        />
      ))}
    </div>
  );
};
export default GetMovies;
