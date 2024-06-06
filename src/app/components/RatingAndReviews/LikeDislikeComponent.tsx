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

export const LikeDislikeComponent = ({ reviewData, setReviewData }: any) => {
  const { _id, reviewLikes, reviewDislikes } = reviewData || {};

  const { authUser } = useAuthenticationContext() || {};

  const { userId } = authUser || {};

  const likedByCurrentUser = reviewLikes.includes(userId);
  const dislikedByCurrentUser = reviewDislikes.includes(userId);

  const navigate = useNavigate();

  const handleLikeDislike = async (actionType: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/reviews/${actionType}-review`,
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
      setReviewData((prev: any) =>
        prev.map((review: any) =>
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
