import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { flexTheme } from "../../../styles/theme";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";
import { MultipleResults } from "./MultipleResults";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [onTypingInput, setOnTypingInput] = useState("");
  const [movieSearch, setMovieSearch] = useState([]);

  const handleInput = (e: React.ChangeEvent) => {
    setInput((e.target! as HTMLInputElement).value);
  };

  const debounceValue = useDebounce(onTypingInput, 500);
  const API_KEY = process.env.REACT_APP_MOVIEDB_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      if (debounceValue) {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${debounceValue}&page=1&include_adult=false`
          );
          setMovieSearch(res.data.results);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        }
      } else {
        setMovieSearch([]);
      }
    };

    fetchMovies();
  }, [debounceValue]);

  const navigate = useNavigate();
  function handleNavigate(value: string) {
    navigate(`/movie-app-ts/search/${value}`);
    setInput("");
  }
  return (
    <Flex
      flexDirection="column"
      position="relative"
      justifyContent="center"
      m={{ base: "1rem 0 0 0", lg: "2rem 0 0 0 " }}
    >
      <Box
        {...flexTheme}
        alignItems="unset"
        mb={{ base: "0", xl: "48px" }}
        maxWidth="1250px"
        width="100%"
      >
        <Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNavigate(input);
            }}
          >
            <Input
              size={{ base: "sm", md: "lg" }}
              borderTopLeftRadius="20px !important"
              borderBottomLeftRadius="20px !important"
              borderTopRightRadius="unset !important"
              borderBottomRightRadius="unset !important"
              type="search"
              backgroundColor="#fff"
              width={{
                base: "72vw",
                sm: "62vw",
                lg: "50vw",
              }}
              placeholder="Search movie..."
              onChange={(e) => {
                setOnTypingInput(e.target.value);
                handleInput(e);
              }}
              value={input}
            />
          </form>
        </Box>
        <Box>
          <IconButton
            data-testid="search"
            name="search"
            borderRadius="0"
            borderTopRightRadius="20px"
            borderBottomRightRadius="20px"
            size={{ base: "sm", md: "lg" }}
            aria-label="Search database"
            isActive={true}
            icon={<SearchIcon />}
            onClick={(e) => {
              e.preventDefault();
              handleNavigate(input);
            }}
          />
        </Box>
      </Box>
      {movieSearch.length > 0 && <MultipleResults movieSearch={movieSearch} />}
    </Flex>
  );
};
export default SearchBar;
