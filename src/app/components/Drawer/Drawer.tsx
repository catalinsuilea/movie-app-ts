import React from "react";
import { Box, Icon, Divider, Flex } from "@chakra-ui/react";
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
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { HeaderTheme } from "../../../styles/theme";

function DrawerExample({ headerLinks }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const btnRef: any = React.useRef();
  const hamburger = faBars as IconProp;
  const { authUser } = useAuthenticationContext();

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
          <DrawerHeader>Explore</DrawerHeader>

          <DrawerBody>
            {headerLinks.map((link: any) => (
              <Link
                onClick={() => {
                  navigate(`/movie-app-ts/${link.mediaType}`);
                  onClose();
                }}
                key={link.mediaType}
                {...HeaderTheme.link}
                color="black"
                display="block"
                width="100%"
                mb="4px"
              >
                {link.link}
              </Link>
            ))}
            {authUser && (
              <>
                <Divider marginTop="12px" />
                <Flex alignItems="center" m="12px 0">
                  <Icon w={4} h={4} as={ChevronRightIcon} />
                  <Link
                    onClick={() => {
                      navigate(`/favourites?page=1`);
                      onClose();
                    }}
                  >
                    Your favourites
                  </Link>
                </Flex>
              </>
            )}

            <Divider marginTop="12px" />
            <DrawerHeader paddingX={0}>No account ?</DrawerHeader>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Icon w={4} h={4} as={ChevronRightIcon} />
              <Link
                onClick={() => {
                  navigate(`/signUp`);
                  onClose();
                }}
              >
                Join us
              </Link>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerExample;
