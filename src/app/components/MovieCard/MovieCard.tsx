import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Card from "../../../types-modules/Card";
import { Box, Image } from "@chakra-ui/react";
import { flexTheme } from "../../../styles/theme";

const MovieCard = (props: Card) => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setisLoading(!isLoading);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Box data-testid="movie-card" margin="2.5em auto" w="100%" {...flexTheme}>
      <Link
        to={`/${props.title}/${props.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box>
          <Box
            flexFlow={["column", "column", "column", "row"]}
            display="flex"
            justifyContent="flex-start"
            w={["90vw", "85vw"]}
            margin="10px auto"
            p="0"
            boxShadow="0 0 4px 2px rgba(0,0,0,0.2)"
            borderRadius="10px"
            _hover={{
              cursor: "pointer",
              boxShadow: "0 0 6px 4px rgba(0,0,0,0.2)",
            }}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <Box>
                  {" "}
                  <Image
                    width={[null, "auto", "100%", "100%"]}
                    m="0"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                    src={
                      props.imgSrc
                        ? `https://www.themoviedb.org/t/p/w780/${props.imgSrc}`
                        : "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
                    }
                  />
                </Box>
                <Box
                  width="100%"
                  textAlign="left"
                  margin="5px 15px"
                  textDecoration="none"
                >
                  <Box m="15px 0" fontSize="23px" fontWeight="500">
                    {props.title}
                  </Box>
                  <Box mr={["20px"]}>{props.description}</Box>
                  <Box
                    fontWeight="bold"
                    m="15px 0"
                    fontSize={{ base: "21px", md: "19px" }}
                  >
                    ⭐{props.rating}
                  </Box>
                  <Box>Release date: {props.releaseDate}</Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
export default MovieCard;
