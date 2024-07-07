import React from "react";

import { Button } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

interface NextButtonProps {
  nextSlide: () => void;
}

export const NextButton = ({ nextSlide }: NextButtonProps) => {
  return (
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
        opacity: "0.5",
        color: "#fff",
      }}
      mx="2px"
    >
      <ArrowRightIcon color="#fff" fontSize={{ base: "15px", md: "22px" }} />
    </Button>
  );
};
