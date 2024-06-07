import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
  List,
  ListItem,
  Icon,
  Divider,
  Link,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { PersonCardDetails } from "../MovieDetails/PersonCardDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

const AccountPage = ({}) => {
  const { favouritesMoviesFromDB } = useFavourites();
  const { authUser } = useAuthenticationContext();
  const { username } = authUser || {};
  const [userReviews, setUserReviews] = useState([]);
  const [userInformation, setUserInformation] = useState<any>(null);
  const { userId } = useParams();
  const currentUser = authUser.userId === userId;

  const navigate = useNavigate();

  useEffect(() => {
    const URL = `http://localhost:5000/user/reviews/fetchAll/${userId}`;
    const getUserReviews = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }
        const data = await response.json();
        setUserReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };
    getUserReviews();
  }, [userId]);

  useEffect(() => {
    const URL = `http://localhost:5000/user/fetchUser/${userId}`;
    const getUserInformation = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`${response.statusText} ${response.status}`);
        }
        const data = await response.json();
        setUserInformation(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInformation();
  }, [userId]);

  return (
    <Flex justify="center" p={4}>
      <Box maxW="1250px" w="100%">
        <Flex>
          {/* Left Box */}
          <Box
            flex="3"
            p={4}
            boxShadow="md"
            border="1px solid"
            borderColor="gray.200"
            mr={4}
          >
            <Flex mb={4}>
              <Image
                borderRadius="full"
                boxSize="150px"
                src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg"
                alt={username}
                mr={4}
              />
              <VStack align="start">
                <Text fontWeight="bold" fontSize="xl">
                  {currentUser ? username : userInformation!?.username}
                </Text>
                <Text>MoviePilotApp member since: June 2024</Text>
              </VStack>
            </Flex>
            {currentUser && <Button mb={4}>Edit</Button>}

            <Divider />

            <Box mb={4} mt={4}>
              <Heading size="md" mb={2}>
                {currentUser
                  ? "Your ratings"
                  : `${userInformation?.username}'s reviews`}
              </Heading>
              <List
                spacing={3}
                display="flex"
                alignItems="center"
                gap="0.75rem"
                flexWrap="wrap"
              >
                {userReviews.map((review: any, index) => (
                  <PersonCardDetails
                    data={review}
                    index={index}
                    tabType={review.mediaType}
                    isMyAccount
                  />
                ))}
              </List>
            </Box>

            <Divider />

            {currentUser && (
              <Box marginTop="0.75rem">
                <Heading size="md" mb={2}>
                  Your Favourites
                </Heading>
                <List
                  spacing={3}
                  display="flex"
                  alignItems="center"
                  gap="0.75rem"
                  flexWrap="wrap"
                >
                  {favouritesMoviesFromDB.map((favourite, index) => (
                    <PersonCardDetails
                      data={favourite}
                      index={index}
                      tabType={favourite.media_type}
                    />
                  ))}
                </List>
              </Box>
            )}
          </Box>

          {/* Right Box */}
          {currentUser && (
            <Box
              flex="1"
              p={4}
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <Box
                border="1px solid grey.200"
                boxShadow="md"
                borderRadius="5px"
                mb={4}
                padding="12px 6px"
              >
                <Heading size="md" mb={2}>
                  Checklist
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <HStack>
                      <Icon as={CheckCircleIcon} color="green.500" />
                      <Text>Upload your picture</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <Icon
                        as={
                          userReviews.length > 0 ? CheckCircleIcon : WarningIcon
                        }
                        color={userReviews.length > 0 ? "green.500" : "orange"}
                      />
                      <Text>Rate some titles!</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <Icon
                        as={
                          userReviews.length > 0 ? CheckCircleIcon : WarningIcon
                        }
                        color={userReviews.length > 0 ? "green.500" : "orange"}
                      />
                      <Text>Write a review</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <Icon as={WarningIcon} color="orange" />
                      <Text>Premium member</Text>
                    </HStack>
                  </ListItem>
                </List>
              </Box>

              <Box
                mt="12px"
                border="1px solid grey.200"
                boxShadow="md"
                borderRadius="5px"
                padding="12px 6px"
              >
                <Heading size="md" mb={2}>
                  Quick Links
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <Link
                      onClick={() => navigate(`/reset/auth/${userId}`)}
                      color="blue.600"
                    >
                      Reset password
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      onClick={() => navigate("/favourites")}
                      color="blue.600"
                    >
                      Favourites page
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link color="red.500">Delete account</Link>
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default AccountPage;
