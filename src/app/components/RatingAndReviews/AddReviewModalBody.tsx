import React, { useCallback, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Divider,
  Input,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import {
  AddReviewCardBodyTypes,
  ReviewData,
} from "../../../types-modules/Reviews";

const ReviewBody = ({
  movie,
  reviewHeadlineValue,
  setReviewHeadLineValue,
  rating,
  setRating,
  reviewTextAreaValue,
  setReviewTextAreaValue,
  isEditing,
}: AddReviewCardBodyTypes) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewHeadLineValue(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTextAreaValue(e.target.value);
  };

  const { dataToEdit } = isEditing || {};

  const isReviewData = (data: ReviewData | {}): data is ReviewData => {
    return (data as ReviewData).reviewContent !== undefined;
  };

  let ratingValue: number, reviewHeadline, reviewContent;

  if (isReviewData(dataToEdit)) {
    ({ ratingValue, reviewHeadline, reviewContent } = dataToEdit);
  } else {
    ratingValue = 0;
    reviewHeadline = "";
    reviewContent = "";
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
      {/* Header */}
      <Flex alignItems="start">
        <Image
          src={`https://www.themoviedb.org/t/p/w780/${
            movie.still_path || movie.poster_path
          }`}
          alt={movie.still_path || movie.poster_path}
          boxSize="100px"
          objectFit="cover"
        />
        <Text fontSize="2xl" ml="4">
          {movie?.title || movie?.name}{" "}
          <Text as="span">
            (
            {`${(movie?.release_date || movie?.air_date)
              ?.split("-")
              .slice(0, 1)}`}
            )
          </Text>
        </Text>
      </Flex>

      <Divider my="4" />

      {/* Body */}
      <Box
        width="100%"
        bg="gray.100"
        p="2"
        textAlign="center"
        textTransform="uppercase"
      >
        Your Rating
      </Box>

      <Box width="100%" display="flex" alignItems="center">
        {Array(10)
          .fill("")
          .map((_, index) => (
            <IconButton
              minWidth={{
                base: "1.2rem",
                md: "1.9rem",
              }}
              key={index}
              icon={<StarIcon />}
              colorScheme={
                index < (hoverRating || rating || ratingValue)
                  ? "yellow"
                  : "gray.200"
              }
              variant="ghost"
              onClick={() => setRating(index + 1)}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${index + 1} stars`}
            />
          ))}
        <Text ml="3">{rating || ratingValue}/10</Text>
      </Box>

      <Box
        width="100%"
        bg="gray.100"
        p="2"
        textAlign="center"
        textTransform="uppercase"
      >
        Your Review
      </Box>

      <Input
        value={reviewHeadlineValue || reviewHeadline}
        onChange={handleHeadlineChange}
        placeholder="Write a headline for your review here"
        mt="4"
      />

      <Textarea
        placeholder="Write your review here, max 500 characters"
        mt="4"
        maxLength={500}
        value={reviewTextAreaValue || reviewContent}
        onChange={handleTextAreaChange}
      />
    </Box>
  );
};

export default ReviewBody;
