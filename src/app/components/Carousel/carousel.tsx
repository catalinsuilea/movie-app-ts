import React from "react";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import Carousel, { ScrollMode } from "nuka-carousel";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { SignInModal } from "../Modal/SignInModal";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { CarouselCardComponent } from "./CarouselCardComponent";

const CarouselComponent = ({
  isLoading,
  latestMovies,
  isModalOpen,
  onCloseModal,
  checkUserState,
}: any) => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useDeviceTypeContext();
  const { handleFavourites, favouritesMoviesFromDB } = useFavourites();

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

  return (
    <>
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
              <CarouselCardComponent
                {...item}
                checkUserState={checkUserState}
                handleFavourites={handleFavourites}
                favouritesMoviesFromDB={favouritesMoviesFromDB}
              />
            ))}
          </Carousel>
        )}
      </Box>
      <SignInModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />
    </>
  );
};

export default CarouselComponent;
