import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuthenticationContext } from "./AuthenticationContext";
import { MovieProps } from "../../types-modules/MovieProps";
import { getFavourites } from "../../utils/getFavourites";

interface FavoritesContextTypes {
  /** An array of objects containing the favourite movies from database */
  favouritesMoviesFromDB: MovieProps[];

  /** Function that handles the add/remove favourites */
  handleFavourites: (movie: MovieProps) => void;

  isFavourite: boolean;
  checkIsFavourite: any;
  setIsFavourite: any;
}

const FavouritesContext = createContext<FavoritesContextTypes>(
  {} as FavoritesContextTypes
);

export const FavouritesContextProvider = ({ children }: any) => {
  const { authUser } = useAuthenticationContext();
  const [favouritesMoviesFromDB, setFavouriteMoviesFromDB] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourites = async (movie: MovieProps, media_type?: string) => {
    if (!authUser) return;
    try {
      const URL = "http://localhost:5000/favourites/post-favourites";
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
        setFavouriteMoviesFromDB((prevFavourites): any => [
          ...prevFavourites,
          movie,
        ]);
      } else if (data.message === "Movie removed from favourites") {
        setFavouriteMoviesFromDB((prevFavourites) =>
          prevFavourites.filter((favMovie: any) => favMovie.id !== movie.id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkIsFavourite = (id: number) => {
    if (!authUser) return;
    const favouriteMovieObj = favouritesMoviesFromDB?.find(
      (movie: MovieProps) => movie.id === id
    );
    if (!favouriteMovieObj && !isFavourite) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  };

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
