export const getFavourites = async (setFavouritesMoviesFromDB?: any) => {
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
  setFavouritesWithPagination?: any,
  setPaginationData?: any,
  currentPage?: any
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
    setFavouritesWithPagination(data.favourites);
    setPaginationData(data.pagination);
  } catch (err: any) {
    console.error("Error fetching favourites:", err.message);
  }
};
