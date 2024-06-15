import { FavouritesWithPaginationTypes } from "./Favourites/FavouritesTypes";
import { MoviePropsFavourites } from "./MovieProps";

export interface MovieCardProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  checkUserState?: () => void;
  isLoading?: boolean;
  favouritesWithPagination?: MoviePropsFavourites[];
  media_type_header?: string;

  /** Movie attributes */
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imgSrc?: string;
  description?: string;
  rating?: number;
  releaseDate?: number | string;

  //Movie card for person details
  profile_path?: string;
  original_name?: string;
  media_type?: string;
  gender?: number;
}
