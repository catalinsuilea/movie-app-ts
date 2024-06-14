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
  const { userId } = authUser || {};

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
        <DrawerContent
          bg="#00308F"
          color="#fff"
          css={{
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(to right, rgba(15, 32, 39, 1) 0%, rgba(44, 83, 100, 1) 100%)",
          }}
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Explore</DrawerHeader>

          <DrawerBody>
            {headerLinks.map((link: any) => (
              <Link
                onClick={() => {
                  navigate(`/movie-app-ts/${link.mediaType}`);
                  onClose();
                }}
                key={link.mediaType}
                color="blue.300"
                fontSize="lg"
                fontWeight="600"
                display="block"
                width="100%"
                mb="4"
                _hover={{ textDecoration: "underline" }}
              >
                {link.link}
              </Link>
            ))}
            {authUser && (
              <>
                <Divider my="4" />
                <Box my="4">
                  <Link
                    onClick={() => {
                      navigate(`/user-account/${userId}`);
                      onClose();
                    }}
                    color="#fff"
                    fontSize="lg"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    My account
                  </Link>
                </Box>
              </>
            )}

            <Divider my="4" />

            {!authUser && (
              <>
                <DrawerHeader p={0} mt="4">
                  No account?
                </DrawerHeader>
                <Box display="flex" alignItems="center" mt="2">
                  <Icon as={ChevronRightIcon} w={5} h={5} color="blue.500" />
                  <Link
                    onClick={() => {
                      navigate(`/signUp`);
                      onClose();
                    }}
                    ml="2"
                    color="blue.500"
                    fontSize="lg"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Join us
                  </Link>
                </Box>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerExample;
