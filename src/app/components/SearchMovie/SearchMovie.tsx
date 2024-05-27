import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Results from "../../../types-modules/MovieSearchResults";
import { useParams } from "react-router-dom";

interface MovieSearch {
  page?: number;
  results?: Results[];
  total_pages?: number;
  total_results?: number;
}
const SearchMovie = () => {
  const [movieSearch, setMovieSearch] = useState<MovieSearch>({});

  // Get movie title from the url
  const { searchValue } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=380f962505ebde6dee08b0b646fe05f1&query=${searchValue}&page=1&include_adult=false`
      );
      const data = await res.data;
      setMovieSearch(data);
    };
    fetchMovies();
  }, [searchValue]);

  return (
    <Box>
      {movieSearch?.results?.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </Box>
  );
};
export default SearchMovie;
