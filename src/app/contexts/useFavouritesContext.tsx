import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuthenticationContext } from "./AuthenticationContext";
import { MoviePropsFavourites } from "../../types-modules/MovieProps";
import {
  getFavourites,
  getFavouritesWithPagination,
} from "../../utils/getFavourites";
import { useSearchParams } from "react-router-dom";
import {
  FavoritesContextTypes,
  FavouritesWithPaginationTypes,
} from "../../types-modules/Favourites/FavouritesTypes";

const FavouritesContext = createContext<FavoritesContextTypes>(
  {} as FavoritesContextTypes
);

export const FavouritesContextProvider = ({ children }: any) => {
  const { authUser } = useAuthenticationContext();
  const [favouritesMoviesFromDB, setFavouriteMoviesFromDB] = useState<
    MoviePropsFavourites[]
  >([]);
  const [favouritesWithPagination, setFavouritesWithPagination] = useState<
    FavouritesWithPaginationTypes[]
  >([]);
  const [paginationData, setPaginationData] = useState<{
    currentPage: number;
    totalPages: number;
  } | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const [searchParams] = useSearchParams();
  const initialPage = searchParams.get("page") || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleFavourites = async (
    movie: MoviePropsFavourites,
    media_type?: string
  ) => {
    if (!authUser) return;
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/favourites/post-favourites`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ movie: movie, media_type: media_type }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}, ${response.status}`);
      }
      const data = await response.json();

      if (data.message === "Movie added to favourites.") {
        setFavouriteMoviesFromDB((prevFavourites: MoviePropsFavourites[]) => [
          ...prevFavourites,
          movie,
        ]);
        setFavouritesWithPagination((prevFavourites): any => [
          ...prevFavourites,
          movie,
        ]);
      } else if (data.message === "Movie removed from favourites") {
        setFavouriteMoviesFromDB((prevFavourites: MoviePropsFavourites[]) =>
          prevFavourites.filter(
            (favMovie: MoviePropsFavourites) => favMovie.id !== movie.id
          )
        );
        setFavouritesWithPagination((prevFavourites) =>
          prevFavourites.filter(
            (favMovie: FavouritesWithPaginationTypes) =>
              favMovie.id !== movie.id
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkIsFavourite = (id: number | string) => {
    if (!authUser) return;
    const favouriteMovieObj = favouritesMoviesFromDB?.find(
      (movie: MoviePropsFavourites) => movie.id === id
    );
    if (!favouriteMovieObj && !isFavourite) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  };

  // Pagination
  useEffect(() => {
    if (!authUser) return;
    getFavouritesWithPagination(
      setFavouritesWithPagination,
      setPaginationData,
      currentPage
    );
  }, [authUser, favouritesWithPagination.length, initialPage, currentPage]);

  //Rest of components with favourites
  useEffect(() => {
    if (!authUser) return;
    getFavourites(setFavouriteMoviesFromDB);
  }, [authUser, favouritesMoviesFromDB.length]);

  useEffect(() => {
    if (!authUser) {
      setIsFavourite(false);
    }
  }, [authUser]);

  return (
    <FavouritesContext.Provider
      value={{
        favouritesMoviesFromDB,
        favouritesWithPagination,
        paginationData,
        setCurrentPage,
        handleFavourites,
        checkIsFavourite,
        isFavourite,
        setIsFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
