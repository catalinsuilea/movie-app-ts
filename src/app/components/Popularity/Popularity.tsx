import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Movies from "../../../types-modules/movies";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface TopRatedMovies {
  page?: number;
  results?: Movies[];
  total_pages?: number;
  total_results?: number;
}

const Popularity = () => {
  const [popularMovies, setPopularMovies] = useState<TopRatedMovies>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const res = await axios.get(
        ` http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=380f962505ebde6dee08b0b646fe05f1&page=${currentPage}&vote_count.gte=50`
      );
      const data = await res.data;
      setPopularMovies(data);
    };
    fetchPopularMovies();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevioustPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };

  let movies = popularMovies?.results;
  let totalPages = popularMovies?.total_pages;

  return (
    <>
      {movies?.map((movie: Movies) => (
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
      <Flex justify="center" alignItems="center" gap="12px">
        <Link
          to={`/top-rated-movies/page=${
            currentPage <= 1 ? 1 : currentPage - 1
          }`}
        >
          <Box fontSize="20px">
            <Button onClick={handlePrevioustPage}>Prev</Button>
          </Box>
        </Link>
        <Box m="0 10px">
          Page {currentPage} / {totalPages}
        </Box>
        <Link to={`/top-rated-movies/page=${currentPage + 1}`}>
          <Box fontSize="20px">
            <Button onClick={handleNextPage}>Next</Button>
          </Box>{" "}
        </Link>
      </Flex>
    </>
  );
};
export default Popularity;
