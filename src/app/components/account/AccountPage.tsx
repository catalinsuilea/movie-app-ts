import React, { ReactElement, useEffect, useState, ChangeEvent } from "react";
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
  Input,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { PersonCardDetails } from "../MovieDetails/PersonCardDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useFavourites } from "../../contexts/useFavouritesContext";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { NoPageFound } from "../common/404NotFound";

const AccountPage = ({}) => {
  const { favouritesMoviesFromDB } = useFavourites();
  const { authUser } = useAuthenticationContext();
  const { username } = authUser || {};
  const [userReviews, setUserReviews] = useState([]);

  const [file, setFile] = useState<File | null | undefined>(null);
  const [formData, setFormData] = useState<FormData | null | undefined>(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);

  const [fileErrorMsg, setFileErrorMsg] = useState("");
  const [userInformation, setUserInformation] = useState<any>(null);
  const { userId } = useParams();
  const currentUser = authUser.userId === userId;

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileErrorMsg("");
    }
  };
  console.log(file);
  useEffect(() => {
    if (!file) return;
    const newFormData = new FormData();
    newFormData.append("image", file);
    setFormData(newFormData);
  }, [file]);

  const uploadFile = async () => {
    if (!authUser) {
    }
    try {
      const response = await fetch("http://localhost:5000/user/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "File upload failed");
      }

      const data = await response.json();
      setUserProfilePicture(data.user_profile_picture);
    } catch (error: any) {
      setFileErrorMsg(error.message);
    } finally {
      setFormData(undefined);
      setFile(undefined);
    }
  };

  useEffect(() => {
    if (!authUser) return;
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
    if (!authUser) return;
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
  console.log("heyy");
  if (!authUser) {
    return <NoPageFound />;
  }

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
                boxSize="100px"
                src={`http://localhost:5000/${
                  userProfilePicture || userInformation?.profile_picture
                }`}
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
            {currentUser && (
              <Box>
                <Flex
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="12px"
                >
                  <Input
                    border="none"
                    width="auto"
                    cursor="pointer"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    mb="12px"
                    onClick={uploadFile}
                  >
                    Upload photo
                  </Button>
                </Flex>
                <Text mb="0.5rem" color="red.400" ml="0.75rem">
                  {fileErrorMsg}
                </Text>
              </Box>
            )}

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
