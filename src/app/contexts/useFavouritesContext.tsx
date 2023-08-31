import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuthenticationContext } from "./AuthenticationContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface Movie {
  title: string;
  id: string;
  vote_average: number;
  poster_path: string;
  release_date: number;
  overview: string;
}

const FavouritesContext = createContext<any>({});

export const FavouritesContextProvider = ({ children }: any) => {
  const { authUser, documentId } = useAuthenticationContext();

  const [favouriteMovies, setFavouriteMovies] = useState<any>([]);
  const [favouritesMoviesFromDB, setFavouriteMoviesFromDB] = useState([]);

  const handleFavourites = async (movie: Movie) => {
    if (!authUser && !documentId) return;
    else {
      const userDocRef = doc(db, "users", documentId);

      const isUniqueMovieInDB = favouritesMoviesFromDB.find(
        (movieDB: Movie) => movieDB.id === movie.id
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
          setFavouriteMovies((prev: any) => [...prev, movie]);
        } catch (e) {
          console.log(e);
        }
      } else {
        const updatedFavourites = favouritesMoviesFromDB.filter(
          (movieDB: Movie) => movieDB.id !== movie.id
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
