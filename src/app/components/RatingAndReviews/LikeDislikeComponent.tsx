import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { LikeDislikeTypes } from "../../../types-modules/Reviews";

export const LikeDislikeComponent = ({
  reviewData,
  setReviewData,
}: LikeDislikeTypes) => {
  const { _id, reviewLikes, reviewDislikes } = reviewData || {};

  const { authUser } = useAuthenticationContext() || {};

  const { userId } = authUser || {};

  const likedByCurrentUser = userId
    ? reviewData.reviewLikes.includes(userId)
    : false;
  const dislikedByCurrentUser = userId
    ? reviewData.reviewDislikes.includes(userId)
    : false;

  const navigate = useNavigate();

  const handleLikeDislike = async (actionType: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DEPLOYED_URL}/reviews/${actionType}-review`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ reviewId: _id }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`${response.statusText} ${response.status}`);
      }
      const data = await response.json();
      setReviewData((prev) =>
        prev.map((review) =>
          review?._id === data.reviewData?._id ? data.reviewData : review
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex>
      <Box display="flex" alignItems="center" padding="2px">
        <Text
          onClick={() => {
            if (authUser) {
              handleLikeDislike("like");
            } else {
              navigate("/signIn");
            }
          }}
          _hover={{ backgroundColor: "gray.200", cursor: "pointer" }}
        >
          {" "}
          {likedByCurrentUser ? (
            <FaThumbsUp fontSize="18px" />
          ) : (
            <FaRegThumbsUp fontSize="18px" />
          )}
        </Text>

        <Text ml="6px" fontWeight="600">
          {" "}
          {reviewLikes.length}
        </Text>
      </Box>{" "}
      <Box display="flex" alignItems="center" ml="24px" padding="2px">
        <Text
          onClick={() => {
            if (authUser) {
              handleLikeDislike("dislike");
            } else {
              navigate("/signIn");
            }
          }}
          _hover={{ backgroundColor: "gray.200", cursor: "pointer" }}
        >
          {dislikedByCurrentUser ? (
            <FaThumbsDown fontSize="18px" />
          ) : (
            <FaRegThumbsDown fontSize="18px" />
          )}
        </Text>
        <Text fontWeight="600" ml="6px" as="span">
          {reviewDislikes.length}
        </Text>
      </Box>
    </Flex>
  );
};
