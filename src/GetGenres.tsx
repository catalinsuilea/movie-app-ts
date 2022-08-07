import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import Genres from "./types-modules/genres";
import { Box, Select } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const GetGenres: React.FC = () => {
  const [genre, setGenre] = useState<Genres[]>([]);
  useEffect(() => {
    const getGenre = async function () {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US"
      );
      const data = await res?.data;
      setGenre(data.genres);
    };
    getGenre();
  }, []);
  const navigate = useNavigate();
  function handleChange(name: string, id: number) {
    navigate(`movies/${name}/${id}`);
  }
  return (
    <div>
      <Box width="30vw" textAlign="center" margin="20px auto">
        <Box margin="20px 0" fontSize="22px" fontWeight="500">
          <h1>Pick movies by genre!</h1>
        </Box>
        <Select
          data-testid="genres-id"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onChange={(e: React.ChangeEvent) => {
            const movie = genre.filter(
              (item) => item.name === (e.target! as HTMLOptionElement).value
            );
            const [obj] = movie;
            let genreId = obj.id;
            console.log(genreId);
            handleChange(obj.name, genreId);
          }}
          placeholder="Select genre..."
          _hover={{ cursor: "pointer" }}
        >
          {genre.map((item) => (
            <option key={item.id}> {item.name}</option>
          ))}
        </Select>
      </Box>
      <Outlet />
    </div>
  );
};
export default GetGenres;
