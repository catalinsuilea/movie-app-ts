import React, { useState } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Outlet, useNavigate } from "react-router-dom";
import PlacementExample from "../Drawer/Drawer";

interface setMovieTitle {
  setMovieTitle: (input: string) => void;
}
const WelcomePage = (props: setMovieTitle) => {
  const [input, setInput] = useState("");

  const handleInput = (e: React.ChangeEvent) => {
    setInput((e.target! as HTMLInputElement).value);
  };
  const searchByInput = () => {
    const changeTitleInput = input?.split(" ").join("%20");
    console.log(changeTitleInput);
    props.setMovieTitle(changeTitleInput);
  };
  const navigate = useNavigate();
  function handleNavigate(value: string) {
    navigate(`/movie/${value}`);
  }
  return (
    <Box margin="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box fontSize="26px" letterSpacing="1.5px">
          <h1 data-testid="h1Id">Discover</h1>
        </Box>
        <Box display="flex">
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // console.log(movieTitle);
                searchByInput();
                handleNavigate(input);
              }}
            >
              <Input
                type="search"
                borderTopRightRadius="0"
                borderBottomRightRadius="0"
                size="lg"
                placeholder="Search movie..."
                width="70vw"
                onChange={handleInput}
              />
            </form>
          </Box>
          <Box>
            <IconButton
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              size="lg"
              aria-label="Search database"
              isActive={true}
              icon={<SearchIcon />}
              onClick={(e) => {
                e.preventDefault();
                searchByInput();
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box mt="20px">
        <PlacementExample />
      </Box>
      <Outlet />
    </Box>
  );
};
export default WelcomePage;
