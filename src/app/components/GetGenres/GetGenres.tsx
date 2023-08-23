import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import Genres from "../../../types-modules/genres";
import { Box, Flex, Select } from "@chakra-ui/react";
import { flexTheme } from "../../../styles/theme";

const GetGenres = () => {
  const [genre, setGenre] = useState<Genres[]>([]);
  useEffect(() => {
    const getGenre = async function () {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US"
      );
      const data = await res.data;
      setGenre(data.genres);
    };

    getGenre();
  }, []);
  const navigate = useNavigate();
  function handleChange(name: string, id: number) {
    navigate(`movies/${name}/${id}`);
  }
  if (genre?.length === 0) {
    return <h1 data-testid="loading">Loading...</h1>;
  }

  return (
    <>
      <Flex alignItems="center" flexDirection="column" margin="20px auto">
        <Box margin="20px 0" fontSize="22px" fontWeight="500">
          <h1 data-testid="test">Pick movies by genre!</h1>
        </Box>
        <Select
          data-testid="genres-id"
          {...flexTheme}
          onChange={(e: React.ChangeEvent) => {
            const movie = genre.filter(
              (item) => item.name === (e.target! as HTMLOptionElement).value
            );
            const [obj] = movie;
            let genreId = obj.id;
            handleChange(obj.name, genreId);
          }}
          placeholder="Select genre..."
          _hover={{ cursor: "pointer" }}
        >
          {genre.map((item) => (
            <option key={item.id}> {item.name}</option>
          ))}
        </Select>
      </Flex>
      <Outlet />
    </>
  );
};
export default GetGenres;
