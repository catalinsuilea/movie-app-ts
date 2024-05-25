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

  useEffect(() => {
    const fetchMovies = async () => {
      if (debounceValue) {
        try {
          const res = await axios.get(
            // `https://api.themoviedb.org/3/search/movie?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US&query=${debounceValue}&page=1&include_adult=false`
            `https://api.themoviedb.org/3/search/multi?api_key=380f962505ebde6dee08b0b646fe05f1&query=${debounceValue}&page=1&include_adult=false`
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

  // const movie = [
  //   {
  //     adult: false,
  //     backdropPath: "/zVDJ4cRgSpHlILSm7kGiklHQ6O7.jpg",
  //     genreIds: [16, 35, 12, 28],
  //     id: 1062807,
  //     originalLanguage: "ja",
  //     originalTitle: "劇場版 SPY×FAMILY CODE: White",
  //     overview:
  //       "While under the guise of taking his family on a weekend winter getaway, Loid's attempt to make progress on his current mission Operation Strix proves difficult when Anya mistakenly gets involved and triggers events that threaten world peace.",
  //     popularity: 334.334,
  //     posterPath: "/xlIQf4y9eB14iYzNN142tROIWON.jpg",
  //     releaseDate: "2023-12-22",
  //     title: "SPY x FAMILY CODE: White",
  //     video: false,
  //     voteAverage: 7.516,
  //     voteCount: 94,
  //   },
  //   {
  //     adult: false,
  //     gender: 2,
  //     id: 1892,
  //     known_for: [
  //       {
  //         backdrop_path: "/3dPhs7hUnQLphDFzdkD407VZDYo.jpg",
  //         id: 286217,
  //         original_title: "The Martian",
  //         overview:
  //           "During a manned mission to Mars, Astronaut Mark Wa…d find a way to signal to Earth that he is alive.",
  //         poster_path: "/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg",
  //       },
  //     ],
  //     known_for_department: "Acting",
  //     media_type: "person",
  //     name: "Matt Damon",
  //     original_name: "Matt Damon",
  //     popularity: 76.028,
  //     profile_path: "/At3JgvaNeEN4Z4ESKlhhes85Xo3.jpg",
  //   },
  // ];
  const navigate = useNavigate();
  function handleNavigate(value: string) {
    navigate(`/movie-app-ts/movie/${value}`);
    setInput("");
  }
  return (
    <Flex flexDirection="column" position="relative">
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
      {movieSearch.length > 0 && <MultipleResults movieSearch={movieSearch} />}
    </Flex>
  );
};
export default SearchBar;
