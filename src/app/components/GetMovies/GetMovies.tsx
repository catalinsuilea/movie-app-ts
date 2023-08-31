import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import Movies from "../../../types-modules/movies";
import { SignInModal } from "../Modal/SignInModal";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

const GetMovies = () => {
  const [movies, setMovie] = useState<Movies[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { genreID } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authUser } = useAuthenticationContext();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=380f962505ebde6dee08b0b646fe05f1&with_genres=${genreID}`
      );
      const data = await res.data;
      setMovie(data.results);
    };
    fetchMovies();
  }, [genreID]);

  useEffect(() => {
    if (movies) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [movies, genreID]);

  // Open modal if user isn't authenticated and clicks on heart icon
  const checkUserState = () => {
    if (authUser) return;
    setIsModalOpen(true);
  };

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          authUser={authUser}
          isModalOpen={isModalOpen}
          onCloseModal={onCloseModal}
          checkUserState={checkUserState}
          isLoading={isLoading}
          {...movie}
        />
      ))}
      <SignInModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
    </>
  );
};
export default GetMovies;
