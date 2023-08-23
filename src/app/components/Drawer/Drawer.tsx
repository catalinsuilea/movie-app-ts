import React from "react";
import { Box, Icon, Divider } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();
  const hamburger = faBars as IconProp;
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mt="8px">
        <Box fontSize="24px">
          <FontAwesomeIcon icon={hamburger} />
        </Box>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search movies by:</DrawerHeader>

          <DrawerBody>
            <Link to="/genres">
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                {" "}
                <Icon w={4} h={4} as={ChevronRightIcon} />
                <p>Genre</p>
              </Box>
            </Link>

            <Link to="/top-rated-movies">
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                {" "}
                <Icon w={4} h={4} as={ChevronRightIcon} />
                <p>Rating</p>
              </Box>
            </Link>
            <Divider marginTop="12px" />
            <DrawerHeader paddingX={0}>No account ?</DrawerHeader>
            <Link to="/signUp">
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Icon w={4} h={4} as={ChevronRightIcon} />
                <p>Join us</p>
              </Box>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerExample;
