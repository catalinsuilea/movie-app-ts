import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import ReviewBody from "./AddReviewModalBody";
import { AddReviewCardTypes, ReviewData } from "../../../types-modules/Reviews";

export const AddReviewCard = ({
  isModalOpen,
  onCloseModal,
  data,
  mediaType,
  setReviewData,
  setReviewAlreadyAdded,
  isEditing,
  season,
  episode,
  mediaId,
  authUser,
}: AddReviewCardTypes) => {
  const [reviewHeadlineValue, setReviewHeadLineValue] = useState("");
  const [reviewTextAreaValue, setReviewTextAreaValue] = useState("");
  const [rating, setRating] = useState(0);

  const { id, title, name, poster_path, still_path } = data || {};
  const { dataToEdit } = isEditing || {};

  const isReviewData = (data: ReviewData | {}): data is ReviewData => {
    return (data as ReviewData).reviewContent !== undefined;
  };

  let ratingValue, reviewHeadline, reviewContent;

  if (isReviewData(dataToEdit)) {
    ({ ratingValue, reviewHeadline, reviewContent } = dataToEdit);
  } else {
    ratingValue = "";
    reviewHeadline = "";
    reviewContent = "";
  }

  const payload = {
    rating: rating || ratingValue,
    reviewHeadlineValue: reviewHeadlineValue || reviewHeadline,
    reviewTextAreaValue: reviewTextAreaValue || reviewContent,
    mediaType: mediaType,
    mediaId: mediaType === "episode" ? mediaId : id,
    mediaName: title || name,
    season: season,
    episode: episode,
    imgSrc: poster_path || still_path,
  };

  const sendReviewForm = async () => {
    if (!authUser) return;
    const URL = isEditing.editing
      ? "http://localhost:5000/reviews/edit-review"
      : "http://localhost:5000/reviews/add-review";
    const METHOD = isEditing.editing ? "PUT" : "POST";
    try {
      const response = await fetch(URL, {
        method: METHOD,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          payload: payload,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (isEditing.editing) {
        setReviewData((prev) =>
          prev.map((review) =>
            review?._id === data.reviewData?._id ? data.reviewData : review
          )
        );
      } else {
        setReviewData((prev) => [...prev, data.reviewData]);
      }
      onCloseModal();
      setReviewAlreadyAdded(true);
      setReviewHeadLineValue("");
      setReviewTextAreaValue("");
      setRating(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isModalOpen}
      onClose={onCloseModal}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Write a review</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReviewBody
            reviewHeadlineValue={reviewHeadlineValue}
            setReviewHeadLineValue={setReviewHeadLineValue}
            rating={rating}
            setRating={setRating}
            reviewTextAreaValue={reviewTextAreaValue}
            setReviewTextAreaValue={setReviewTextAreaValue}
            movie={data}
            isEditing={isEditing}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onCloseModal}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              sendReviewForm();
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
