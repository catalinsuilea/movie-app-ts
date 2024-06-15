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
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { HeaderTypes } from "../../../types-modules/HomepageTypes/HomepageTypes";

export const HeaderDesktop = ({ headerLinks }: HeaderTypes) => {
  const navigate = useNavigate();
  const { authUser, handleLogout } = useAuthenticationContext();

  const { userId } = authUser || {};

  const location = useLocation();
  const pathnameArr = location?.pathname?.split("/");
  const currentPage = pathnameArr[pathnameArr?.length - 1];

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
        <Box>
          {headerLinks.map((link) => (
            <Link
              onClick={() => navigate(`/movie-app-ts/${link.mediaType}`)}
              key={link.mediaType}
              {...HeaderTheme.link}
              borderBottom={
                currentPage === link.mediaType ? "2px solid white" : "unset"
              }
            >
              {link.link}
            </Link>
          ))}
          <Link {...HeaderTheme.link}>
            <Navbar />
          </Link>
        </Box>
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
                onClick={() => navigate(`/user-account/${userId}`)}
              >
                <Text>My account</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem justifyContent="center" onClick={handleLogout}>
                <Text>Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Box>
  );
};
