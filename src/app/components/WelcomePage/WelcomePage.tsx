import React, { useState } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Outlet, useNavigate, Routes, Route } from "react-router-dom";
import PlacementExample from "../Drawer/Drawer";
import CarouselComponent from "../Carousel/carousel";
import Header from "../Header/Header";
import { afterTheme, flexTheme } from "../../../styles/theme";
import moviePosters from "../../../helpers/posters";
import getRandomPoster from "../../../helpers/random";
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
    setInput("");
  };
  const navigate = useNavigate();
  function handleNavigate(value: string) {
    navigate(`/movie/${value}`);
  }
  console.log(getRandomPoster(moviePosters));
  return (
    <Box>
      <Header />
      <Box margin="0 5em">
        <Box
          position="relative"
          height="auto"
          backgroundImage={`url(${getRandomPoster(moviePosters)})`}
          backgroundRepeat="no-repeat"
          backgroundSize=" 100% 100%"
          objectFit="cover"
          {...afterTheme.searchContainer}
          zIndex="1"
          // m="0 auto"
        >
          {/* <Box fontSize="26px" letterSpacing="1.5px">
            <h1 data-testid="h1Id">Discover</h1>
          </Box> */}
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box width="81%" m="40px auto">
              <Box
                textAlign="left"
                fontWeight="700"
                fontSize="44px"
                color="#fff"
                letterSpacing="1.2px"
              >
                Welcome.
              </Box>
              <Box
                letterSpacing="1.1px"
                textAlign="left"
                fontSize="34px"
                color="#fff"
              >
                Millions of movies, TV shows and people to discover.Explore now!
              </Box>
            </Box>

            <Box display="flex" justifyContent="center" mb="80px">
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
          </Box>
        </Box>
        <Outlet />
        <Box
          mt="20px"
          {...flexTheme}
          flexDirection="column"
          alignItems="flex-start"
        >
          <PlacementExample />
          <Box textAlign="left" fontSize="30px" letterSpacing="1.2px">
            <h1>Newest movies</h1>
          </Box>
        </Box>

        {/* or 
      <Routes>
        <Route path="genres" element={<GetGenres />}></Route>
        <Route path="/top-rated-movies" element={<Popularity />}></Route>
      </Routes> */}

        <Box>
          {" "}
          <CarouselComponent />
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomePage;
