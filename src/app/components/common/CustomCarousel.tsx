import React from "react";
import Carousel from "nuka-carousel";
import { Button, Box } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Trailers } from "../MovieDetails/Trailers";
import { MediaPhotos } from "../MovieDetails/MediaPhotos";
import {
  CustmoCarouselTypes,
  PhotosTypes,
  TrailersTypes,
} from "../../../types-modules/MovieInfo";
import { NextButton } from "./CarouselButtons/NextButton";
import { PrevButton } from "./CarouselButtons/PrevButton";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";

interface CustomControlsProps {
  nextSlide: () => void;
  previousSlide: () => void;
}

export const CustomCarousel: React.FC<CustmoCarouselTypes> = ({
  data,
  wrapAround = true,
  slidesToShow = 2,
  autoplay = false,
  pagingDotsStyle = { fill: "#fff" },
  componentName,
  slidesToScroll = 1,
}) => {
  const { isMobile } = useDeviceTypeContext();

  const CustomControlsMobile = ({
    previousSlide,
    nextSlide,
  }: CustomControlsProps) => (
    <Box display="flex" position="absolute" bottom="10px" px="10px" right="0">
      <Button
        border="1px solid black"
        backgroundColor="black"
        opacity="0.7"
        color="#fff"
        p="1rem 4px"
        height={{ base: "35px", md: "60px" }}
        zIndex="2"
        background="none"
        onClick={previousSlide}
        _hover={{
          opacity: "1",
        }}
        mx="2px"
      >
        <ArrowLeftIcon color="#fff" fontSize={{ base: "15px", md: "23px" }} />
      </Button>
      <Button
        border="none"
        zIndex="2"
        onClick={nextSlide}
        p="1rem 4px"
        height={{ base: "35px", md: "60px" }}
        backgroundColor="black"
        opacity="0.7"
        color="#fff"
        _hover={{
          opacity: "1",
        }}
        mx="2px"
      >
        <ArrowRightIcon color="#fff" fontSize={{ base: "15px", md: "22px" }} />
      </Button>
    </Box>
  );

  return (
    <Box position="relative">
      <Carousel
        wrapAround={wrapAround}
        slidesToShow={slidesToShow}
        autoplay={autoplay}
        slidesToScroll={slidesToScroll}
        defaultControlsConfig={{
          pagingDotsStyle: pagingDotsStyle,
        }}
        {...(isMobile
          ? {
              renderBottomCenterControls: CustomControlsMobile,
              renderCenterLeftControls: null,
              renderCenterRightControls: null,
            }
          : {
              renderCenterLeftControls: ({ previousSlide }) => (
                <PrevButton previousSlide={previousSlide} />
              ),
              renderCenterRightControls: ({ nextSlide }) => (
                <NextButton nextSlide={nextSlide} />
              ),
            })}
      >
        {data.map((item, index) =>
          componentName === "Trailers" ? (
            <Trailers key={index} trailer={item as TrailersTypes} />
          ) : (
            <MediaPhotos
              key={index}
              index={index}
              photos={item as PhotosTypes}
            />
          )
        )}
      </Carousel>
    </Box>
  );
};
