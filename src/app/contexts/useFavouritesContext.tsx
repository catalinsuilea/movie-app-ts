import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuthenticationContext } from "./AuthenticationContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { MovieProps } from "../../types-modules/MovieProps";

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
  const { authUser, documentId } = useAuthenticationContext();

  const [favouriteMovies, setFavouriteMovies] = useState<any>([]);
  const [favouritesMoviesFromDB, setFavouriteMoviesFromDB] = useState([]);

  const handleFavourites = async (movie: MovieProps) => {
    if (!authUser && !documentId) return;
    else {
      const userDocRef = doc(db, "users", documentId);

      const isUniqueMovieInDB = favouritesMoviesFromDB.find(
        (movieDB: MovieProps) => movieDB.id === movie.id
      );

      if (!isUniqueMovieInDB) {
        const updatedFavourites = [
          ...favouritesMoviesFromDB,
          { ...movie, isFavourite: true },
        ];

        try {
          await updateDoc(userDocRef, {
            favourites: updatedFavourites,
          });
          setFavouriteMovies((prev: MovieProps[]) => [...prev, movie]);
        } catch (e) {
          console.log(e);
        }
      } else {
        const updatedFavourites = favouritesMoviesFromDB.filter(
          (movieDB: MovieProps) => movieDB.id !== movie.id
        );

        try {
          await updateDoc(userDocRef, {
            favourites: updatedFavourites,
          });
          setFavouriteMoviesFromDB(updatedFavourites);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    if (!documentId) return;

    const userDocRef = doc(db, "users", documentId);

    getDoc(userDocRef)
      .then((userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFavouriteMoviesFromDB(userData.favourites);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [documentId, favouriteMovies?.length]);

  return (
    <FavouritesContext.Provider
      value={{ favouritesMoviesFromDB, handleFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
