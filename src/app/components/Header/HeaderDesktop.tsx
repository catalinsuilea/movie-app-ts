import React from "react";
import { Box, Image, Link } from "@chakra-ui/react";
import { flexTheme, HeaderTheme } from "../../../styles/theme";
import logo from "../../../logo/movie-pilot.svg";
import Navbar from "../menuHover/menuHover";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

export const HeaderDesktop = () => {
  const navigate = useNavigate();
  const { authUser, handleSignOut } = useAuthenticationContext();

  return (
    <Box {...HeaderTheme.linksContainer}>
      <Box {...flexTheme}>
        <Image
          cursor="pointer"
          onClick={() => {
            navigate("/");
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
          <Link {...HeaderTheme.link} onClick={() => handleSignOut()}>
            Logout
          </Link>
        )}
      </Box>
    </Box>
  );
};
