import { FavouritesWithPaginationTypes } from "../types-modules/Favourites/FavouritesTypes";
import { MoviePropsFavourites } from "../types-modules/MovieProps";

export const getFavourites = async (
  setFavouritesMoviesFromDB: React.Dispatch<
    React.SetStateAction<MoviePropsFavourites[]>
  >
) => {
  try {
    const URL = "http://localhost:5000/favourites/get-favourites";
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    setFavouritesMoviesFromDB(data.favourites);
  } catch (err: any) {
    console.error("Error fetching favourites:", err.message);
  }
};

export const getFavouritesWithPagination = async (
  setFavouritesWithPagination: React.Dispatch<
    React.SetStateAction<FavouritesWithPaginationTypes[]>
  >,
  setPaginationData: React.Dispatch<
    React.SetStateAction<{ currentPage: number; totalPages: number } | null>
  >,
  currentPage: number | string
) => {
  try {
    const URL = `http://localhost:5000/favourites/get-favourites/pagination?page=${currentPage}`;
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (data) {
      setFavouritesWithPagination(data.favourites);
      setPaginationData(data.pagination);
    }
  } catch (err: any) {
    console.error("Error fetching favourites:", err.message);
  }
};
