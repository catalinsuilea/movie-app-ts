import React, { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Trailers } from "../MovieDetails/Trailers";

export const CustomSlider = ({ trailers }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trailers.length);
  };

  const previousSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + trailers.length) % trailers.length
    );
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  return (
    <Box
      position="relative"
      maxWidth="800px"
      width="100%"
      mx="auto"
      overflow="hidden"
      float="left"
    >
      <Box
        display="flex"
        transform={`translateX(-${currentIndex * 72}%)`}
        transition="transform 0.5s ease"
        onTransitionEnd={handleTransitionEnd}
        width={`${trailers.length * 40}%`}
      >
        {trailers.map((trailer: any, index: number) => (
          <Box key={index} flex="0 0 100%">
            <Trailers trailer={trailer} />
          </Box>
        ))}
      </Box>
      <Box>
        <IconButton
          border="1px solid black"
          backgroundColor="black"
          opacity="0.4"
          color="#fff"
          p="1rem 4px"
          height="60px"
          icon={<ArrowLeftIcon />}
          position="absolute"
          top="50%"
          left="3%"
          transform="translateY(-50%)"
          onClick={previousSlide}
          background="none"
          _hover={{ opacity: "0.7", backgroundColor: "none", color: "#fff" }}
          aria-label="left-icon"
        />
      </Box>
      <Box zIndex="-1">
        <IconButton
          opacity="0.4"
          height="60px"
          color="#fff"
          backgroundColor="black"
          border="1px solid black"
          p="1rem 4px"
          icon={<ArrowRightIcon />}
          position="absolute"
          top="50%"
          right="1.75%"
          transform="translateY(-50%)"
          onClick={nextSlide}
          background="none"
          _hover={{ opacity: "0.7", backgroundColor: "none", color: "#fff" }}
          aria-label="right-icon"
        />
      </Box>
    </Box>
  );
};
