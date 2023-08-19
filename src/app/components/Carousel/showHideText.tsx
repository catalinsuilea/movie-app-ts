import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";

const ShowHideText = (props: any) => {
  const { id, overview } = props;
  const [show, setShow] = useState<any>({});
  return (
    <Box zIndex="2" width="70%" color="#fff" m="0 20px">
      {overview.split(" ").length > 2
        ? overview.split(" ").slice(0, 20).join(" ")
        : overview}
      {show[id] ? (
        <Box fontSize="14.5px">
          {overview ? (
            <Box color="#fff">
              {overview.split(" ").slice(20).join(" ")}
              <Button
                backgroundColor="transparent"
                border="none"
                ml="-10px"
                fontSize="15.0px"
                mb="5px"
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
          ml="-10px"
          fontSize="15.5px"
          mb="5px"
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
