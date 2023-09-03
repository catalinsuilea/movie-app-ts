import React, { useState } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { flexTheme } from "../../../styles/theme";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleInput = (e: React.ChangeEvent) => {
    setInput((e.target! as HTMLInputElement).value);
  };

  const navigate = useNavigate();
  function handleNavigate(value: string) {
    navigate(`/movie-app-ts/movie/${value}`);
    setInput("");
  }
  return (
    <Box {...flexTheme} alignItems="unset" mb="80px">
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
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
            handleNavigate(input);
          }}
        />
      </Box>
    </Box>
  );
};
export default SearchBar;
