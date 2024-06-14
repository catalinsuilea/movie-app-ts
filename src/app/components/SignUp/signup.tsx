import React from "react";
import { Box, Heading, Icon } from "@chakra-ui/react";
import { SignUpTheme } from "../../../styles/theme";
import { CheckIcon } from "@chakra-ui/icons";
import { SignUpFormComponent } from "./SignUpFormComponent";

const SignUp = () => {
  return (
    <Box
      m="2em 2em 3.15rem 2em"
      display="flex"
      justifyContent="flex-start"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box
        borderRadius="10px"
        boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
        width={{ base: "auto", lg: "300px" }}
      >
        <Heading {...SignUpTheme.heading}>
          <h1> Benefits of being a member</h1>
        </Heading>
        <Box {...SignUpTheme.benefits}>
          <Box m="10px 15px">
            <small>
              <Icon mr="8px">
                <CheckIcon />
              </Icon>
            </small>
            <span>
              Find something to watch on your subscribed streaming services
            </span>
          </Box>
          <Box m="15px 10px">
            <small>
              <Icon mr="8px">
                <CheckIcon />
              </Icon>
            </small>
            <span> Log the movies and TV shows you have watched</span>
          </Box>
          <Box m="15px 10px">
            <small>
              <Icon mr="8px">
                <CheckIcon />
              </Icon>
            </small>
            <span>
              Keep track of your favourite movies and TV shows and get
              recommendations from them
            </span>
          </Box>
          <Box m="15px 10px">
            <small>
              <Icon mr="8px">
                <CheckIcon />
              </Icon>
            </small>

            <span>Build and maintain a personal watchlist</span>
          </Box>
          <Box m="15px 10px">
            <small>
              <Icon mr="8px">
                <CheckIcon />
              </Icon>
            </small>
            <span> Build custom mixed lists (movies and TV)</span>
          </Box>
          <Box m="15px 10px">
            <small>
              <Icon mr="8px">
                <CheckIcon />
              </Icon>
            </small>
            <span>Take part in movie and TV discussions</span>
          </Box>
          <Box m="15px 10px">
            <small>
              <Icon mr="8px">
                <CheckIcon />
              </Icon>
            </small>
            <span>
              Contribute to, and improve the information in our database
            </span>
          </Box>
        </Box>
      </Box>
      <Box
        textAlign={{ base: "center", md: "left" }}
        ml={{ base: "0", md: "24px", lg: "48px" }}
        mt={{ base: "16px", md: "unset" }}
      >
        <Box mb="15px" fontSize="22px" fontWeight="700">
          <h1>Sign up for an account</h1>
        </Box>
        <Box fontSize="19px">
          <p>
            Signing up for an account is free and easy. Fill out the form below
            to get started.
          </p>
        </Box>
        <Box m="20px 0">
          <SignUpFormComponent />
        </Box>
      </Box>
    </Box>
  );
};
export default SignUp;
