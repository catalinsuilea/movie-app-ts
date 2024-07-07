import React from "react";

import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

interface PrevButtonProps {
  previousSlide: () => void;
}

export const PrevButton = ({ previousSlide }: PrevButtonProps) => {
  return (
    <Button
      border="none"
      zIndex="2"
      onClick={previousSlide}
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
      <ArrowLeftIcon color="#fff" fontSize={{ base: "15px", md: "22px" }} />
    </Button>
  );
};
