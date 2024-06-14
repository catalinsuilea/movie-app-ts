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
import { DeleteAccountModal } from "./DeleteAccountModal";
import { PremiumDetails } from "./PremiumDetails";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { formatDate } from "../../../utils/formatDate";

const AccountPage = ({}) => {
  const { favouritesMoviesFromDB } = useFavourites();
  const { authUser, handleLogout } = useAuthenticationContext();
  const { username } = authUser || {};
  const [userReviews, setUserReviews] = useState([]);

  const [file, setFile] = useState<File | null | undefined>(null);
  const [formData, setFormData] = useState<FormData | null | undefined>(null);
  const [userProfilePicture, setUserProfilePicture] = useState(null);

  const [fileErrorMsg, setFileErrorMsg] = useState("");
  const [userInformation, setUserInformation] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const { userId } = useParams();
  const currentUser = authUser.userId === userId;

  const { profile_picture } = userInformation || {};

  const navigate = useNavigate();

  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const STRIPE_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  let stripePromise: Promise<Stripe | null> | null = null;
  if (STRIPE_KEY) {
    stripePromise = loadStripe(STRIPE_KEY);
  }

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileErrorMsg("");
    }
  };

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

  const getUserInformation = async (id: string | undefined) => {
    const URL = `http://localhost:5000/user/fetchUser/${id}`;
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

  useEffect(() => {
    if (!authUser) return;
    getUserInformation(userId);
  }, [userId]);

  const handleDeleteAccount = async (userId?: string) => {
    const URL = `http://localhost:5000/user/delete-user`;
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status}`);
      }
      const data = await response.json();
      handleLogout();
      navigate("/movie-app-ts");
    } catch (error) {
      console.error(error);
    }
  };
  const handleBuyPremium = async (offer: string, price: number) => {
    const URL = `http://localhost:5000/user/buy-premium`;
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ offer: offer, price: price }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status}`);
      }
      const session = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelPremium = async (id: string | undefined) => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/cancel-premium",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (data) {
        getUserInformation(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Flex justify="center" p={4}>
        <Box maxW="1250px" w="100%">
          <Flex flexDirection={{ base: "column", md: "row" }} gap="1rem">
            {/* Left Box */}
            <Box
              flex="3"
              p={4}
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
              mr={{ base: "unset", md: 4 }}
            >
              <Flex mb={4}>
                <Image
                  borderRadius="full"
                  boxSize="100px"
                  src={
                    userProfilePicture || userInformation?.profile_picture
                      ? `http://localhost:5000/${
                          userProfilePicture || userInformation?.profile_picture
                        }`
                      : "https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man-300x284.jpg"
                  }
                  alt={username}
                  mr={4}
                />
                <VStack align="start">
                  <Text fontWeight="bold" fontSize="xl">
                    {currentUser ? username : userInformation!?.username}
                  </Text>
                  <Text>
                    MoviePilotApp member since{" "}
                    <Text>{formatDate(userInformation?.createdAt)}</Text>
                  </Text>
                </VStack>
              </Flex>
              {currentUser && (
                <Box>
                  <Flex flexWrap="wrap">
                    <Input
                      border="none"
                      width="250px"
                      cursor="pointer"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      mb="12px"
                      onClick={uploadFile}
                      width={{ base: "100%", md: "unset" }}
                    >
                      Upload photo
                    </Button>
                  </Flex>
                  <Text mb="0.5rem" color="red.400" ml="0.75rem">
                    {fileErrorMsg}
                  </Text>
                </Box>
              )}

              {!currentUser && (
                <HStack mb="12px">
                  <Icon
                    as={
                      userInformation?.isPremiumUser
                        ? CheckCircleIcon
                        : WarningIcon
                    }
                    color={
                      userInformation?.isPremiumUser ? "green.500" : "orange"
                    }
                  />
                  <Text>Premium member</Text>
                </HStack>
              )}

              <Divider />

              <Box mb={4} mt={4}>
                <Heading size="md" mb={2}>
                  {currentUser
                    ? "Your ratings"
                    : `${userInformation?.username}'s reviews`}
                </Heading>
                <List
                  p={{ base: "4px 0", md: "unset" }}
                  spacing={3}
                  display="flex"
                  alignItems="center"
                  gap="0.75rem"
                  overflowX={{ base: "auto", md: "unset" }}
                  flexWrap={{ base: "unset", md: "wrap" }}
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
                    p={{ base: "18px 0", md: "unset" }}
                    spacing={3}
                    display="flex"
                    alignItems="center"
                    gap="0.75rem"
                    overflowX={{ base: "auto", md: "unset" }}
                    flexWrap={{ base: "unset", md: "wrap" }}
                  >
                    {favouritesMoviesFromDB.map(
                      (favourite: any, index: number) => (
                        <PersonCardDetails
                          data={favourite}
                          index={index}
                          tabType={favourite.media_type}
                        />
                      )
                    )}
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
                        <Icon
                          as={
                            userProfilePicture || profile_picture
                              ? CheckCircleIcon
                              : WarningIcon
                          }
                          color={
                            userProfilePicture || profile_picture
                              ? "green.500"
                              : "orange"
                          }
                        />
                        <Text>Upload your picture</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <Icon
                          as={
                            userReviews.length > 0
                              ? CheckCircleIcon
                              : WarningIcon
                          }
                          color={
                            userReviews.length > 0 ? "green.500" : "orange"
                          }
                        />
                        <Text>Rate some titles!</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <Icon
                          as={
                            userReviews.length > 0
                              ? CheckCircleIcon
                              : WarningIcon
                          }
                          color={
                            userReviews.length > 0 ? "green.500" : "orange"
                          }
                        />
                        <Text>Write a review</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <Icon
                          as={
                            userInformation?.isPremiumUser
                              ? CheckCircleIcon
                              : WarningIcon
                          }
                          color={
                            userInformation?.isPremiumUser
                              ? "green.500"
                              : "orange"
                          }
                        />
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
                        onClick={() => navigate("/favourites?page=1")}
                        color="blue.600"
                      >
                        Favourites page
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        onClick={() => openModal("delete-account")}
                        color="red.500"
                      >
                        Delete account
                      </Link>
                    </ListItem>
                  </List>
                </Box>
                <Box mt="12px">
                  {userInformation?.isPremiumUser ? (
                    <Link
                      color="blue.400"
                      onClick={() => openModal("cancel-premium")}
                    >
                      Cancel premium subscription
                    </Link>
                  ) : (
                    <PremiumDetails handleBuyPremium={handleBuyPremium} />
                  )}
                </Box>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
      <DeleteAccountModal
        onCloseModal={onCloseModal}
        isModalOpen={isModalOpen}
        handleDeleteAccount={handleDeleteAccount}
        cancelPremium={cancelPremium}
        userId={userId}
        modalType={modalType}
      />
    </>
  );
};

export default AccountPage;
