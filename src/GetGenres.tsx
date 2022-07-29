import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Genres from "./types-modules/genres";
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
    navigate(`/movies/${name}/${id}`);
  }
  return (
    <div>
      <div className="movie-app">
        <h1>Pick movies by genre!</h1>
        <select
          onChange={(e: React.ChangeEvent) => {
            const movie = genre.filter(
              (item) => item.name === (e.target! as HTMLOptionElement).value
            );
            const [obj] = movie;
            let genreId = obj.id;
            console.log(genreId);
            handleChange(obj.name, genreId);
          }}
        >
          <option></option>
          {genre.map((item) => (
            <option key={item.id}> {item.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default GetGenres;
