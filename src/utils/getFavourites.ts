export const getFavourites = async (setFavouritesMoviesFromDB: any) => {
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
