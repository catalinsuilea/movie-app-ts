import React from "react";
import { Heading, Box, Button, Image, Link } from "@chakra-ui/react";
import { flexTheme, HeaderTheme } from "../../../styles/theme";
import logo from "../../../logo/movie-pilot.svg";
import Navbar from "../menuHover/menuHover";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../SignUp/AuthenticationContext";

const Header = () => {
  const navigate = useNavigate();
  const { authUser, handleSignOut } = useAuthenticationContext();

  return (
    <Heading
      zIndex="2"
      background="linear-gradient(to right, #141e30, #243b55)"
      height="80px"
      position="relative"
    >
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
          <Link {...HeaderTheme.link}>TV Shows</Link>
          <Link {...HeaderTheme.link}>People</Link>
          <Link {...HeaderTheme.link}>More</Link>
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
    </Heading>
  );
};
export default Header;
