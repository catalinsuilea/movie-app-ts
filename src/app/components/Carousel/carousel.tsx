import React from "react";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import Carousel, { ScrollMode } from "nuka-carousel";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";
import { SignInModal } from "../Modal/SignInModal";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { CarouselCardComponent } from "./CarouselCardComponent";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

const CarouselComponent = ({
  isLoading,
  latestMovies,
  isModalOpen,
  onCloseModal,
  checkUserState,
}: any) => {
  const { isMobile, isTablet } = useDeviceTypeContext();
  const { handleFavourites, favouritesMoviesFromDB } = useFavourites();
  const { authUser } = useAuthenticationContext();

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
            // autoplay
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
                mb={{ base: "8px", md: "none" }}
                onClick={previousSlide}
                _hover={{ backgroundColor: "none", color: "#FFD700" }}
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
                mb={{ base: "8px", md: "none" }}
                _hover={{ backgroundColor: "none" }}
              >
                <ArrowRightIcon color="#fff" fontSize="23px" />
              </Button>
            )}
          >
            {latestMovies?.map((item: any) => (
              <CarouselCardComponent
                {...item}
                checkUserState={checkUserState}
                handleFavourites={handleFavourites}
                favouritesMoviesFromDB={favouritesMoviesFromDB}
                authUser={authUser}
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
