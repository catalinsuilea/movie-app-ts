import React, { useEffect, useState } from "react";
import { Box, Button, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { FaAngleRight, FaCheckCircle, FaPlus } from "react-icons/fa";
import { ReviewCard } from "./ReviewCard";
import { AddReviewCard } from "./AddReviewModal";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { SignInModal } from "../Modal/SignInModal";
import { ReviewData, UserReviewsTypes } from "../../../types-modules/Reviews";

export const UserReviews = ({
  mediaData,
  mediaType,
  mediaId,
  season,
  episode,
}: UserReviewsTypes) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [reviewAlreadyAdded, setReviewAlreadyAdded] = useState(false);
  const [isEditing, setIsEditing] = useState({
    editing: false,
    dataToEdit: {},
  });

  const { authUser } = useAuthenticationContext();

  useEffect(() => {
    const fetchReviews = async () => {
      const URL =
        mediaType !== "episode"
          ? `http://localhost:5000/reviews/get-reviews/${mediaType}/${mediaId}`
          : `http://localhost:5000/reviews/get-reviews-episode/${mediaId}/${mediaType}/${season}/${episode}`;

      try {
        const response = await fetch(URL, { method: "GET" });
        if (!response.ok) {
          throw new Error(`${response.statusText}, ${response.status}`);
        }
        const data = await response.json();
        setReviewData(data.reviewData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, [mediaId, mediaType, reviewAlreadyAdded, season, episode]);

  // Open modal if user isn't authenticated and clicks on heart icon
  const checkUserState = () => {
    if (authUser) return;
    setIsModalOpen(true);
  };

  // Close modal
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const openReviewsModal = () => {
    if (!authUser && !isModalOpen) return;
    setIsReviewsModalOpen(true);
  };

  const onCloseReviewsModal = () => {
    setIsReviewsModalOpen(false);
    setIsEditing({ editing: false, dataToEdit: {} });
  };

  return (
    <>
      <Flex width="auto" flexDirection="column" gap="0.75rem" mt="1.5rem">
        <Flex m={{ base: "2rem 1rem", md: "1rem 2rem" }} flexDirection="column">
          <Flex alignItems="center" gap="8px">
            <Center height="35px">
              <Divider
                orientation="vertical"
                borderWidth="4px"
                borderColor="#00308F"
              />
            </Center>
            <Flex
              justifyContent={{ base: "flex-start", md: "space-between" }}
              alignItems={{ base: "start", md: "center" }}
              width="950px"
            >
              <Box
                as="a"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{
                  cursor: "pointer",
                  "> :last-child": { color: "blue.400" },
                }}
              >
                <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
                  User Reviews
                </Text>
                <Text fontSize="19px" fontWeight="500" ml="0.75rem" as="span">
                  {reviewData.length}
                </Text>
                <Text fontSize="4xl">
                  <FaAngleRight />
                </Text>
              </Box>
              <Box>
                {reviewAlreadyAdded ? (
                  <Flex alignItems="center" gap="4px">
                    <Text color="green">
                      <FaCheckCircle />
                    </Text>
                    <Text color="green" as="span">
                      {" "}
                      {`Review added for this ${mediaType}.`}
                    </Text>
                  </Flex>
                ) : (
                  <Button
                    backgroundColor="transparent"
                    _hover={{ backgroundColor: "blue.100" }}
                    onClick={() => {
                      checkUserState();
                      openReviewsModal();
                    }}
                  >
                    <FaPlus />{" "}
                    <Text ml="8px" as="span">
                      {" "}
                      Add review
                    </Text>
                  </Button>
                )}
              </Box>
            </Flex>
          </Flex>
          <Box
            maxWidth="950px"
            m="1.75rem 0"
            borderRadius="5px"
            position="relative"
          >
            {reviewData.length > 0 ? (
              reviewData.map((review, index) => (
                <ReviewCard
                  reviewData={review}
                  key={review?.userId?._id}
                  index={index}
                  setReviewAlreadyAdded={setReviewAlreadyAdded}
                  openReviewsModal={openReviewsModal}
                  setIsEditing={setIsEditing}
                  setReviewData={setReviewData}
                  season={season}
                  episode={episode}
                />
              ))
            ) : (
              <Text fontSize="lg">{`Looks like there is no review for this ${mediaType} yet. Be the first one that adds a review! `}</Text>
            )}
          </Box>
        </Flex>
      </Flex>
      <AddReviewCard
        isModalOpen={isReviewsModalOpen}
        onCloseModal={onCloseReviewsModal}
        data={mediaData}
        mediaType={mediaType}
        setReviewData={setReviewData}
        setReviewAlreadyAdded={setReviewAlreadyAdded}
        isEditing={isEditing}
        season={season}
        episode={episode}
        mediaId={mediaId}
        authUser={authUser}
      />
      <SignInModal
        modalType="reviews"
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
      />
    </>
  );
};
