import React from "react";
import Carousel from "nuka-carousel";
import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Trailers } from "../MovieDetails/Trailers";
import { MediaPhotos } from "../MovieDetails/MediaPhotos";

export const CustomCarousel = ({
  data,
  wrapAround = true,
  slidesToShow = 2,
  autoplay = false,
  pagingDotsStyle = { fill: "#fff" },
  leftControlStyles = {},
  rightControlStyles = {},
  buttonStyles = {},
  componentName,
  slidesToScroll = 1,
}: any) => {
  return (
    <Carousel
      wrapAround={wrapAround}
      slidesToShow={slidesToShow}
      autoplay={autoplay}
      slidesToScroll={slidesToScroll}
      defaultControlsConfig={{
        pagingDotsStyle: pagingDotsStyle,
      }}
      renderBottomCenterControls={null}
      renderCenterLeftControls={({ previousSlide }) => (
        <Button
          border="1px solid black"
          backgroundColor="black"
          opacity="0.7"
          color="#fff"
          p="1rem 4px"
          height={{ base: "40px", md: "60px" }}
          zIndex="2"
          background="none"
          top={componentName === "Trailers" ? "4rem" : "unset"}
          ml={{ base: "1.5rem", md: "2rem" }}
          mb={{ base: "8px", md: "none" }}
          onClick={previousSlide}
          _hover={{
            opacity: "1",
            backgroundColor: "transparent",
            color: "#fff",
          }}
          {...leftControlStyles}
          {...buttonStyles}
        >
          <ArrowLeftIcon color="#fff" fontSize={{ base: "18px", md: "23px" }} />
        </Button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <Button
          border="none"
          zIndex="2"
          onClick={nextSlide}
          p="1rem 4px"
          height={{ base: "40px", md: "60px" }}
          backgroundColor="black"
          opacity="0.7"
          color="#fff"
          top={componentName === "Trailers" ? "4rem" : "unset"}
          mr={{ base: "1.5rem", md: "2rem" }}
          mb={{ base: "8px", md: "none" }}
          _hover={{
            opacity: "1",
            backgroundColor: "transparent",
            color: "#fff",
          }}
          {...rightControlStyles}
          {...buttonStyles}
        >
          <ArrowRightIcon
            color="#fff"
            fontSize={{ base: "18px", md: "22px" }}
          />
        </Button>
      )}
    >
      {data.map((item: any, index: number) =>
        componentName === "Trailers" ? (
          <Trailers key={index} trailer={item} />
        ) : (
          <MediaPhotos photos={item} />
        )
      )}
    </Carousel>
  );
};
