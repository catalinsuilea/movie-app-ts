import React from "react";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { HeaderTheme } from "../../../styles/theme";
import logo from "../../../logo/movie-pilot.svg";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import PlacementExample from "../Drawer/Drawer";

export const HeaderMobile = () => {
  const navigate = useNavigate();
  const { authUser, handleSignOut } = useAuthenticationContext();

  return (
    <Flex alignItems="center" justifyContent="space-around">
      <Box>
        <Image
          cursor="pointer"
          onClick={() => {
            navigate("/");
          }}
          mr="20px"
          width="100px"
          src={logo}
          mt="8px"
        />
      </Box>
      <Box mt="8px">
        {!authUser ? (
          <Link
            onClick={() => navigate("/signIn")}
            {...HeaderTheme.link}
            mr="unset"
          >
            Login
          </Link>
        ) : (
          <Link {...HeaderTheme.link} onClick={() => handleSignOut()}>
            Logout
          </Link>
        )}
      </Box>
      <PlacementExample />
    </Flex>
  );
};
