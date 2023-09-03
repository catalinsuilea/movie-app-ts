import React from "react";
import { Box, Flex, Text, Link, Icon, Image } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo from "../../../logo/movie-pilot.svg";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      as="footer"
      zIndex="2"
      background="linear-gradient(to right, #141e30, #243b55)"
      width="100%"
      borderTop="1px solid"
      borderTopColor="gray.200"
    >
      <Flex
        p="1.4rem"
        m="0 4rem"
        h="100%"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Flex justifyContent="space-between">
          <Box>
            <Image
              cursor="pointer"
              onClick={() => {
                navigate("/movie-app-ts");
              }}
              width="100px"
              src={logo}
            />
          </Box>
          <Box color="#fff">
            <Link
              href="https://github.com/catalinsuilea"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon as={FaGithub} boxSize={6} mx={2} />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Icon as={FaTwitter} boxSize={6} mx={2} />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Icon as={FaLinkedin} boxSize={6} mx={2} />
            </Link>
          </Box>
        </Flex>
        <Box>
          <Text textAlign="center" fontSize="sm" color="#fff">
            © {new Date().getFullYear()} catalinșuilea. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
