import { MovieData } from "../HomepageTypes/HomepageTypes";
import { MovieCardProps } from "../MovieCardProps";
import MovieInfo from "../MovieInfo";
import { MoviePropsFavourites } from "../MovieProps";

export interface FavouritesWithPaginationTypes extends MovieCardProps {
  _id: string;
  userId: string;
  imgSrc: string;
  title?: string;
  id: number;
  release_date: string;
  overview: string;
  media_type: string;
  vote_average: number;
  poster_path: string;
}

export interface FavoritesContextTypes {
  /** An array of objects containing the favourite movies from database */
  favouritesMoviesFromDB: MoviePropsFavourites[];

  /** Function that handles the add/remove favourites */
  handleFavourites: (movie: MoviePropsFavourites, media_type?: string) => void;
  isFavourite: boolean;
  checkIsFavourite: (id: number | string) => void;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
  favouritesWithPagination: FavouritesWithPaginationTypes[];
  paginationData: { currentPage: number; totalPages: number } | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<string | number>>;
}

export interface FavouriteIconTypes {
  checkUserState?: (modalType?: string) => void;
  checkIsFavourite: (id: string | number) => void;
  handleFavourites: (movie: MoviePropsFavourites, media_type?: string) => void;
  isFavourite: boolean;
  id: number;
  data: MoviePropsFavourites;
  isMovieDetails?: boolean;
  isMovieCard?: boolean;
  media_type?: string;
}
