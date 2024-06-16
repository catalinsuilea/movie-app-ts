import React, { useEffect, useState } from "react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import MovieCard from "../../MovieCard/MovieCard";
import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";
import { SignInModal } from "../../Modal/SignInModal";
import { MovieCardProps } from "../../../../types-modules/MovieCardProps";

export const MediaPage = () => {
  const API_KEY = process.env.REACT_APP_MOVIEDB_KEY;
  const { mediaType } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authUser } = useAuthenticationContext();
  const [headerData, setHeaderData] = useState({
    movie: [],
    tv: [],
    person: [],
  });

  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [selectedSortOptions, setSelectedSortOptions] = useState<string[]>([]);

  const [sortOptionsQuery, setSortOptionsQuery] = useState("");

  const [showSortOptions, setShowSortOptions] = useState(true);

  const toggleSortOptions = () => setShowSortOptions(!showSortOptions);

  const checkUserState = () => {
    if (authUser) return;
    setIsModalOpen(true);
  };

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  type SortCategory =
    | "Original Title"
    | "Popularity"
    | "Revenue"
    | "Primary Release Date"
    | "Vote Average"
    | "Vote Count";

  const sortOptions: Record<SortCategory, string[]> = {
    "Original Title": ["original_title.asc", "original_title.desc"],
    Popularity: ["popularity.asc", "popularity.desc"],
    Revenue: ["revenue.asc", "revenue.desc"],
    "Primary Release Date": [
      "primary_release_date.asc",
      "primary_release_date.desc",
    ],
    "Vote Average": ["vote_average.asc", "vote_average.desc"],
    "Vote Count": ["vote_count.asc", "vote_count.desc"],
  };

  const handleSortChange = (category: SortCategory, value: string) => {
    setSelectedSortOptions((prev) => {
      // Check if the value is already selected
      if (prev.includes(value)) {
        // Remove the value from the selected options
        return prev.filter((option) => option !== value);
      } else {
        // Remove the existing sort options of the same category and add the new value
        const filtered = prev.filter(
          (option) => !sortOptions[category].includes(option)
        );
        return [...filtered, value];
      }
    });
  };

  // Get genres

  useEffect(() => {
    const getGenres = async function () {
      if (mediaType === "person") return;
      try {
        const URL = `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(URL, { method: "GET" });
        if (!response.ok) {
          throw new Error(`${response.statusText},${response.status}`);
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      }
    };
    getGenres();
  }, [mediaType]);

  useEffect(() => {
    if (!API_KEY) return;

    const params = {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: "1",
      with_genres: genreId,
      api_key: API_KEY,
    };

    const query = new URLSearchParams(params).toString();
    const URL = `https://api.themoviedb.org/3/discover/${mediaType}?sort_by=${sortOptionsQuery}&${query}`;

    const getMedia = async () => {
      try {
        const response = await fetch(URL, { method: "GET" });
        if (!response.ok) {
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setHeaderData((prev) => ({
          ...prev,
          [mediaType as string]: data.results,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getMedia();
  }, [mediaType, genreId, sortOptionsQuery]);

  const handleApplyChanges = () => {
    setSortOptionsQuery(selectedSortOptions.join("&"));
  };

  return (
    <Box p="4" display="flex" justifyContent="center">
      <Box maxWidth="1750px" width="100%" p="4" mb="4">
        <Flex gap="2rem" flexDirection={{ base: "column", md: "row" }}>
          {mediaType !== "person" && (
            <Box
              minWidth={{ base: "unset", md: "280px" }}
              padding="0.5rem 0.75rem"
              borderWidth="1px"
              borderRadius="5px"
              boxShadow="md"
            >
              <Button onClick={toggleSortOptions} mb="4">
                <Text>Sort By:</Text>
              </Button>
              <Collapse in={showSortOptions} animateOpacity>
                <Box p="4" borderWidth="1px" borderRadius="md">
                  <Stack spacing={[1, 5]} direction={["column", "column"]}>
                    {(Object.keys(sortOptions) as SortCategory[]).map(
                      (category) => (
                        <Box key={category}>
                          <Text fontWeight="bold">{category}:</Text>
                          {sortOptions[category].map((option) => (
                            <Checkbox
                              key={option}
                              value={option}
                              isChecked={selectedSortOptions.includes(option)}
                              onChange={() =>
                                handleSortChange(category, option)
                              }
                            >
                              {option.includes("asc") ? (
                                <FaArrowCircleUp />
                              ) : (
                                <FaArrowCircleDown />
                              )}
                            </Checkbox>
                          ))}
                        </Box>
                      )
                    )}
                  </Stack>
                  <Button
                    onClick={handleApplyChanges}
                    mt="1rem"
                    textAlign="center"
                  >
                    Apply changes
                  </Button>
                </Box>
              </Collapse>
              <Box>
                <Text mb="4">Sort by genre</Text>
                <Select
                  onChange={(e) => setGenreId(e.target.value)}
                  placeholder="Action"
                >
                  {genres.map((genre: { id: number; name: string }) => (
                    <option value={genre.id}>{genre.name}</option>
                  ))}
                </Select>
              </Box>
            </Box>
          )}

          <Box width="100%">
            {headerData[mediaType as keyof typeof headerData]?.map(
              (item: MovieCardProps) => (
                <MovieCard
                  key={item.id}
                  {...item}
                  media_type_header={mediaType}
                  isModalOpen={isModalOpen}
                  onCloseModal={onCloseModal}
                  checkUserState={checkUserState}
                />
              )
            )}
          </Box>
        </Flex>
      </Box>
      <SignInModal
        modalType="favourites"
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
      />
    </Box>
  );
};
