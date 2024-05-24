export interface MovieCardProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  checkUserState?: () => void;
  isLoading?: boolean;
  favouritesMoviesFromDB: any;

  /** Movie attributes */
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string | number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imgSrc?: string;
  description?: string;
  rating?: number;
  releaseDate?: number | string;
}
