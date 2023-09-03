import React from "react";
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import { flexTheme, HeaderTheme } from "../../../styles/theme";
import logo from "../../../logo/movie-pilot.svg";
import Navbar from "../menuHover/menuHover";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const HeaderDesktop = () => {
  const navigate = useNavigate();
  const { authUser, handleSignOut } = useAuthenticationContext();

  return (
    <Box {...HeaderTheme.linksContainer}>
      <Box {...flexTheme}>
        <Image
          cursor="pointer"
          onClick={() => {
            navigate("/movie-app-ts");
          }}
          mr="20px"
          width="100px"
          src={logo}
        />
        <Link {...HeaderTheme.link}>
          <Navbar />
        </Link>
        <Link {...HeaderTheme.link} color="gray">
          TV Shows
        </Link>
        <Link c {...HeaderTheme.link} color="gray">
          People
        </Link>
        <Link {...HeaderTheme.link} color="gray ">
          More
        </Link>
      </Box>
      <Box {...flexTheme}>
        {!authUser ? (
          <>
            {" "}
            <Link onClick={() => navigate("/signIn")} {...HeaderTheme.link}>
              Login
            </Link>
            <Link
              onClick={() => {
                navigate("/signUp");
              }}
              {...HeaderTheme.link}
            >
              Join
            </Link>
          </>
        ) : (
          <Menu>
            <MenuButton px={4} py={2} transition="all 0.2s">
              <Flex
                justifyContent="center"
                alignItems="center"
                color="#fff"
                fontWeight="600"
              >
                <Text fontSize="18px" textAlign="center">
                  Your account
                </Text>
                <ChevronDownIcon fontSize="32px" />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                justifyContent="center"
                onClick={() => navigate("/favourites")}
              >
                <Text>Your favourites</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                justifyContent="center"
                onClick={() => {
                  {
                    handleSignOut();
                    navigate("/movie-app-ts");
                  }
                }}
              >
                <Text>Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Box>
  );
};
