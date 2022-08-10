import { Box } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import { MovieNameContext } from "../App/App";
import Results from "../../../types-modules/MovieSearchResults";

interface movieSearch {
  page: number | undefined;
  results: Results[] | undefined;
  total_pages: number | undefined;
  total_results: number | undefined;
}
const SearchMovie = () => {
  const [movieSearch, setMovieSearch] = useState<movieSearch>({
    page: undefined,
    results: undefined,
    total_pages: undefined,
    total_results: undefined,
  });
  const movieTitle = useContext(MovieNameContext);
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US&query=${movieTitle}&page=1&include_adult=false`
      );
      const data = await res.data;
      console.log(data);
      setMovieSearch(data);
    };
    fetchMovies();
  }, [movieTitle]);
  return (
    <Box>
      {movieSearch?.results?.map((movie) => (
        <MovieCard
          key={movie.id}
          imgSrc={movie.backdrop_path}
          title={movie.title}
          description={movie.overview}
          rating={movie.vote_average}
          releaseDate={movie.release_date}
          id={movie.id}
        />
      ))}
    </Box>
  );
};
export default SearchMovie;
