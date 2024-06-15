import { AuthUser } from "./AuthenticatedUser";
import { MovieData } from "./HomepageTypes/HomepageTypes";
import MovieInfo from "./MovieInfo";
import { Episode } from "./TvEpisodeDetails";

export interface UserReviewsTypes {
  mediaData: MovieInfo | Episode;
  mediaType?: string;
  mediaId?: string;
  season?: number | string;
  episode?: number | string;
}

export interface ReviewData {
  _id: string;
  userId: {
    _id: string;
    username: string;
  };
  ratingValue: number;
  reviewHeadline: string;
  reviewContent: string;
  reviewLikes: string[];
  reviewDislikes: string[];
  mediaType: string;
  mediaId: number;
  mediaName: string;
  imgSrc: string;
  createdAt: string;
}
export interface isEditing {
  editing: boolean;
  dataToEdit: ReviewData | {};
}

export interface ReviewCardTypes {
  reviewData: ReviewData;
  index: number;
  setReviewAlreadyAdded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<
    React.SetStateAction<{ editing: boolean; dataToEdit: ReviewData | {} }>
  >;
  setReviewData: React.Dispatch<React.SetStateAction<ReviewData[]>>;
  openReviewsModal: () => void;
  season?: number | string;
  episode?: number | string;
}

export interface LikeDislikeTypes {
  reviewData: ReviewData;
  setReviewData: React.Dispatch<React.SetStateAction<ReviewData[]>>;
}

export interface AddReviewCardTypes {
  data: MovieInfo | Episode;
  authUser: AuthUser | null;
  isEditing: isEditing;
  isModalOpen: boolean;
  onCloseModal: () => void;
  mediaType?: string;
  setReviewData: React.Dispatch<React.SetStateAction<ReviewData[]>>;
  setReviewAlreadyAdded: React.Dispatch<React.SetStateAction<boolean>>;
  season?: number | string;
  episode?: number | string;
  mediaId?: string;
}

export interface AddReviewCardBodyTypes {
  movie: MovieInfo;
  reviewHeadlineValue?: string;
  reviewTextAreaValue?: string;
  setReviewHeadLineValue: React.Dispatch<React.SetStateAction<string>>;
  rating?: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;

  setReviewTextAreaValue: React.Dispatch<React.SetStateAction<string>>;
  isEditing: isEditing;
}

export interface MyAccountReviewData extends MovieData {
  id: number;
  imgSrc: string;
  title: string;
  overview: string;
  rating?: string;
  media_type: string;
  _id: string;
}
