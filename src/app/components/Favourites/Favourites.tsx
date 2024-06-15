import React, { useEffect } from "react";
import { Heading, Box, Flex, Image } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";
import { useFavourites } from "../../contexts/useFavouritesContext";
import addToFavouritesImg from "../../../images/addToFavouritesImg.jpg";
import { Link, useNavigate } from "react-router-dom";

export const FavouritesPage = () => {
  const { favouritesWithPagination, paginationData, setCurrentPage } =
    useFavourites();

  const navigate = useNavigate();
  const { currentPage, totalPages } = paginationData || {};

  useEffect(() => {
    if (Number(currentPage) > 1 && favouritesWithPagination.length === 0) {
      const newPage = Number(currentPage) - 1;
      navigate(`/favourites?page=${newPage}`);
      setCurrentPage(newPage);
    }
  }, [favouritesWithPagination.length, currentPage, navigate]);

  return (
    <>
      <Box p="4" display="flex" justifyContent="center">
        <Box maxWidth="1750px" width="100%" p="4" mb="4">
          {favouritesWithPagination?.length === 0 ? (
            <Flex
              height="unset !important"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Heading textAlign="center" margin="2rem">
                Looks like you haven't added any movie to favourites yet
              </Heading>
              <Image
                boxSize="560px"
                src={addToFavouritesImg}
                alt="Add to favourites image"
              />
            </Flex>
          ) : (
            <Box>
              {favouritesWithPagination?.map((movie) => (
                <MovieCard
                  favouritesWithPagination={favouritesWithPagination}
                  key={movie.id}
                  {...movie}
                  isLoading={favouritesWithPagination.length === 0}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Flex
        gap="12px"
        justifyContent="center"
        textAlign="center"
        padding="16px 0"
        fontSize="19px"
      >
        {new Array(totalPages).fill("").map((_, index) => (
          <Link
            key={index + 1}
            to={`?page=${index + 1}`}
            style={{
              backgroundColor: `${
                index + 1 === currentPage ? "#0096FF" : "#f0f0f0"
              }`,
              color: `${index + 1 === currentPage ? "white" : "black"}`,
              border: "1px solid `#ccc`",
              borderRadius: "4px",
              padding: "8px 12px",
              textDecoration: "none",
              display: "inline-block",
            }}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Link>
        ))}
      </Flex>
    </>
  );
};
