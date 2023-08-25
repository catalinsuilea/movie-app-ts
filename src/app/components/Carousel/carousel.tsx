import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Icon,
  Image,
  Link,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Carousel, { ScrollMode } from "nuka-carousel";
import axios from "axios";
import { afterTheme, flexTheme } from "../../../styles/theme";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ShowHideText from "./showHideText";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
const CarouselComponent = () => {
  const [latestMovies, setLatestMovies] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { isMobile, isTablet } = useDeviceTypeContext();

  const getSlidesToShow = () => {
    switch (true) {
      case isTablet:
        return 2;
      case isMobile:
        return 1;
      default:
        return 3;
    }
  };

  const handleNavigate = (input: any) => {
    navigate(`/${input.title}/${input.id}`);
  };
  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=380f962505ebde6dee08b0b646fe05f1&language=en-US&page=1"
        );
        const data = res.data;
        setLatestMovies(data);
        setIsLoading(false);
      } catch (error: any) {
        console.log("Error fetching the latest movies", error);
        setIsLoading(true);
      }
    };
    fetchLatestMovies();
  }, []);

  return (
    <Box position="relative" m="1.25em auto">
      {isLoading ? (
        <Skeleton height="370px" width="100%" />
      ) : (
        <Carousel
          wrapAround
          scrollMode={ScrollMode.remainder}
          slidesToShow={getSlidesToShow()}
          autoplay
          pauseOnHover
          autoplayInterval={3000}
          cellSpacing={3}
          defaultControlsConfig={{
            pagingDotsStyle: {
              fill: "#fff",
            },
          }}
          renderBottomCenterControls={null}
          renderCenterLeftControls={({ previousSlide }) => (
            <Button
              border="none"
              zIndex="2"
              background="none"
              ml="5px"
              p={3}
              onClick={previousSlide}
              _hover={{ backgroundColor: "none", color: "#FFD700" }}
              display={isMobile || isTablet ? "none" : "block"}
            >
              <ArrowLeftIcon color="#fff" fontSize="23px" />
            </Button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <Button
              border="none"
              zIndex="2"
              onClick={nextSlide}
              p={3}
              background="none"
              mr="5px"
              _hover={{ backgroundColor: "none" }}
              display={isMobile || isTablet ? "none" : "block"}
            >
              <ArrowRightIcon color="#fff" fontSize="23px" />
            </Button>
          )}
        >
          {latestMovies?.results?.map((item: any) => (
            <Box key={item.id} {...afterTheme.carousel} position="relative">
              <Link
                zIndex="2"
                color="#fff"
                position="absolute"
                top="10px"
                left="10px"
                fontSize="21px"
                width="100%"
                onClick={() => handleNavigate(item)}
              >
                {item.title}
                <ChevronRightIcon fontSize="27px" />
              </Link>

              <Box
                {...flexTheme}
                height={`${isMobile || isTablet ? "370px" : "unset"}`}
                backgroundColor={{ base: "black", xl: "unset" }}
              >
                <Image
                  src={`https://www.themoviedb.org/t/p/w780/${item.backdrop_path}`}
                />
              </Box>

              <Box
                zIndex="2"
                position="absolute"
                bottom="0"
                {...flexTheme}
                justifyContent="space-evenly"
                alignItems="start"
              >
                <Box>
                  <Image
                    width={{ base: "200px", md: "200px" }}
                    src={`https://www.themoviedb.org/t/p/w780/${item.poster_path}`}
                    boxShadow="0 28px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
                  />
                </Box>
                {isMobile || isTablet ? (
                  <Text
                    color="white"
                    noOfLines={5}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    width="100%"
                    m="0 6px 0 12px"
                    onClick={() => handleNavigate(item)}
                  >
                    {item.overview}
                  </Text>
                ) : (
                  <ShowHideText {...item} />
                )}
              </Box>
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default CarouselComponent;
