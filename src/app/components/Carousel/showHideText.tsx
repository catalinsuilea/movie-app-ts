import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
const ShowHideText = (props: any) => {
  const [show, setShow] = useState<any>({});
  return (
    <Box zIndex="2" width="70%" color="#fff" m="0 20px">
      {props.overview.split(" ").length > 2
        ? props.overview.split(" ").slice(0, 10).join(" ")
        : props.overview}
      {show[props.id] ? (
        <Box fontSize="14.5px">
          {props.overview ? (
            <Box color="#fff">
              {props.overview.split(" ").slice(10).join(" ")}
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
                  setShow({ ...show, [props.id]: false });
                  console.log(show);
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
            setShow({ ...show, [props.id]: true });
            console.log(show);
          }}
        >
          ...see more
        </Button>
      )}
    </Box>
  );
};
export default ShowHideText;
