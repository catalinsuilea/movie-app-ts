import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Movies from "../../../types-modules/movies";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { flexTheme } from "../../../styles/theme";
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
      console.log(data);
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

  console.log(popularMovies);
  let movies = popularMovies?.results;
  let totalPages = popularMovies?.total_pages;
  console.log(movies);

  return (
    <div>
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
      <Box {...flexTheme} margin="40px">
        <Link
          to={`/top-rated-movies/page=${
            currentPage <= 1 ? 1 : currentPage - 1
          }`}
        >
          <Box fontSize="20px">
            <Button
              bg="secondary"
              colorScheme="teal"
              onClick={handlePrevioustPage}
            >
              Prev
            </Button>
          </Box>
        </Link>
        <Box m="0 10px">
          Page {currentPage} / {totalPages}
        </Box>
        <Link to={`/top-rated-movies/page=${currentPage + 1}`}>
          <Box fontSize="20px">
            <Button
              bg="primary"
              variant="solid"
              colorScheme="teal"
              onClick={handleNextPage}
            >
              Next
            </Button>
          </Box>{" "}
        </Link>
      </Box>
    </div>
  );
};
export default Popularity;
