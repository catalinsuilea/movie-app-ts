import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Box, Stack, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { LikeDislikeComponent } from "./LikeDislikeComponent";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

export const ReviewCard = ({
  reviewData,
  index,
  setReviewAlreadyAdded,
  openReviewsModal,
  setIsEditing,
  setReviewData,
  season,
  episode,
}: any) => {
  const [currentUser, setCurrentUser] = useState(false);
  const { authUser } = useAuthenticationContext();
  const navigate = useNavigate();

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if (currentUser) {
    setReviewAlreadyAdded(currentUser);
  }
  useEffect(() => {
    if (!authUser) return;
    setCurrentUser(authUser.userId == reviewData.userId._id);
  }, [authUser, reviewData]);

  const onDeleteReview = async (
    id: number,
    season?: string,
    episode?: string
  ) => {
    const URL =
      !season || !episode
        ? `http://localhost:5000/reviews/delete-review/${id}`
        : `http://localhost:5000/reviews/delete-review/${season}/${episode}/${id}`;
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status}`);
      }
      const data = await response.json();
      setReviewAlreadyAdded(false);
      setCurrentUser(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Card
        padding="1.5rem 0.75rem"
        borderRadius="5px"
        boxShadow="0 0 3px 1px rgba(0,0,0,.2)"
        _before={{
          content: "''",
          display: "block",
          position: "absolute",
          transformOrigin: "top",
          clipPath: "polygon(0 0,50% 50%,100% 0)",
          top: "100%",
          width: "35px",
          height: "35px",
          backgroundColor: "rgba(0,0,0,.3)",
          filter: "blur(30px)",
        }}
      >
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {index === 0 && (
            <Heading
              backgroundColor="blue.500"
              p="6px 10px"
              color="#fff"
              borderRadius="5px"
              width="fit-content"
              size="xs"
              textTransform="uppercase"
              letterSpacing="1.1px"
            >
              Featured Review
            </Heading>
          )}
          <Text fontSize="lg" textTransform="uppercase">
            {`⭐${reviewData?.ratingValue}/10`}
          </Text>
        </CardHeader>

        <CardBody>
          <Stack spacing="4">
            <Box m="12px 0 6px 0">
              <Text pt="2" fontSize="lg" fontWeight="bold">
                {reviewData.reviewHeadline}
              </Text>
            </Box>
            <Box>
              <Text fontSize="md"> {reviewData.reviewContent}</Text>
            </Box>
            <Flex pt="1rem" justifyContent="space-between" alignItems="center">
              {/* Likes */}
              <LikeDislikeComponent
                reviewData={reviewData}
                setReviewData={setReviewData}
              />
              {/* Delete/Edit */}
              {currentUser && (
                <Box>
                  <Button
                    onClick={() => {
                      setIsEditing({ editing: true, dataToEdit: reviewData });
                      openReviewsModal();
                    }}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    onClick={() =>
                      onDeleteReview(reviewData.mediaId, season, episode)
                    }
                    ml="0.75rem"
                  >
                    <FaTrashAlt />
                  </Button>
                </Box>
              )}
            </Flex>
          </Stack>
        </CardBody>
      </Card>
      <Box m="8px 0 16px 0">
        <Text
          as="a"
          color="blue.500"
          fontWeight="600"
          cursor="pointer"
          _hover={{ opacity: 0.7 }}
          onClick={() => navigate(`/user-account/${reviewData.userId._id}`)}
        >
          {currentUser ? "You" : reviewData.userId?.username}
        </Text>
        <Text ml="0.5rem" as="span">
          {formatDate(reviewData.createdAt)}
        </Text>
      </Box>
    </>
  );
};
