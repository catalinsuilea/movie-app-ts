export const getFavourites = async (token: string) => {
  try {
    const URL = "http://localhost:5000/favourites/get-favourites";
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
  } catch (err: any) {
    console.error("Error fetching favourites:", err.message);
  }
};
