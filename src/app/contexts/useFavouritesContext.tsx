import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuthenticationContext } from "./AuthenticationContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { MovieProps } from "../../types-modules/MovieProps";
import { getFavourites } from "../../utils/getFavourites";

interface FavoritesContextTypes {
  /** An array of objects containing the favourite movies from database */
  favouritesMoviesFromDB: MovieProps[];

  /** Function that handles the add/remove favourites */
  handleFavourites: (movie: MovieProps) => void;
}

const FavouritesContext = createContext<FavoritesContextTypes>(
  {} as FavoritesContextTypes
);

export const FavouritesContextProvider = ({ children }: any) => {
  const { authUser } = useAuthenticationContext();
  const { token } = authUser || {};
  const [favouritesMoviesFromDB, setFavouriteMoviesFromDB] = useState([]);

  const handleFavourites = async (movie: MovieProps) => {
    if (!authUser) return;
    try {
      const URL = "http://localhost:5000/favourites/post-favourites";

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movie: movie }),
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

  useEffect(() => {
    if (!token) return;
    getFavourites(token, setFavouriteMoviesFromDB);
  }, [token]);

  return (
    <FavouritesContext.Provider
      value={{
        favouritesMoviesFromDB,
        handleFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
