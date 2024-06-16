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
  const API_KEY = process.env.REACT_APP_MOVIEDB_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchValue}&page=1&include_adult=false`
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
