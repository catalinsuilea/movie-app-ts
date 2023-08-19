import React, { useState } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Outlet, useNavigate, Routes, Route } from "react-router-dom";
import { flexTheme, SearchBarTheme } from "../../../styles/theme";
interface setMovieTitle {
  setMovieTitle: (input: string) => void;
}

const SearchBar = (props: setMovieTitle) => {
  const [input, setInput] = useState("");

  const handleInput = (e: React.ChangeEvent) => {
    setInput((e.target! as HTMLInputElement).value);
  };
  const searchByInput = () => {
    const changeTitleInput = input?.split(" ").join("%20");
    props.setMovieTitle(changeTitleInput);
    setInput("");
  };
  const navigate = useNavigate();
  function handleNavigate(value: string) {
    navigate(`/movie/${value}`);
  }
  return (
    <Box {...flexTheme} alignItems="unset" mb="80px">
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchByInput();
            handleNavigate(input);
          }}
        >
          <Input
            borderRadius="0"
            type="search"
            backgroundColor="#fff"
            borderTopLeftRadius="20px"
            borderBottomLeftRadius="20px"
            size="lg"
            placeholder="Search movie..."
            width="70vw"
            onChange={handleInput}
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
          size="lg"
          aria-label="Search database"
          isActive={true}
          icon={<SearchIcon />}
          onClick={(e) => {
            e.preventDefault();
            searchByInput();
            handleNavigate(input);
          }}
        />
      </Box>
    </Box>
  );
};
export default SearchBar;
