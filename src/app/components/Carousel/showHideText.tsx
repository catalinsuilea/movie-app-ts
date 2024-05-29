import React from "react";
import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

const ShowHideText = ({ overview, id }: any) => {
  const [show, setShow] = useState<any>({});
  return (
    <Box zIndex="2" width="70%" color="#fff" m="0 20px" fontSize="13.5px">
      {overview.split(" ").length > 2
        ? overview.split(" ").slice(0, 10).join(" ")
        : overview}
      {show[id] ? (
        <Box fontSize="12.5px">
          {overview ? (
            <Box color="#fff">
              {overview.split(" ").slice(0, 12).join(" ")}
              <Button
                backgroundColor="transparent"
                border="none"
                ml="-12px"
                mt="-4px"
                fontSize="13.5px"
                _hover={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => {
                  setShow({ [id]: false });
                }}
              >
                see less...
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Box>
      ) : (
        <Button
          backgroundColor="transparent"
          border="none"
          fontSize="13.5px"
          ml="-12px"
          mt="-4px"
          _hover={{
            backgroundColor: "transparent",
            border: "none",
          }}
          onClick={() => {
            setShow({ ...show, [id]: true });
          }}
        >
          ...see more
        </Button>
      )}
    </Box>
  );
};
export default ShowHideText;
