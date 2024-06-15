import { AuthUser } from "../AuthenticatedUser";
import { MoviePropsFavourites } from "../MovieProps";

export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
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

  // Coming from database, it is a TV series or person details
  rating?: string;
  media_type?: string;
  mediaType?: string;
  ratingValue?: string;
  mediaName?: string;
  name?: string;
  imgSrc?: string;
  profile_path?: string;
  mediaId?: number;
  episode?: number;
  season?: number;
}

export interface LatestMoviesTypes {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface MovieTvListTypes {
  data: MovieData[];
  tabs: string[];
  isLoading: boolean;
  description: string;
  getRandomImage: (data: MovieData[]) => void;
  handleTabClick: (tabName: string, tabType: string) => void;
  tabType: string;
}

export interface CarouselComponentTypes {
  isLoading: boolean;
  latestMovies: MovieData[];
  isModalOpen: boolean;
  onCloseModal: () => void;
  checkUserState: () => void;
}
export interface CarouselCardComponentTypes extends MovieData {
  handleFavourites: (movie: MoviePropsFavourites, media_type?: string) => void;
  checkUserState: () => void;
  favouritesMoviesFromDB: MoviePropsFavourites[];
  authUser: AuthUser | null;
}

export interface PersonCardDetailsTypes {
  data: MovieData;
  index: number;
  isMovieTVList?: boolean;
  tabType?: string;
  isMyAccount?: boolean;
}

// Search bar types
interface KnownForTypes {
  original_title?: string;
  original_name: string;
  id: string;
}

interface MediaDataSearchBarTypes extends MovieData {
  original_name: string;
  media_type: string;
  gender: number;
  releaseDate: string;
  known_for: KnownForTypes[];
  voteAverage: number;
  first_air_date: string;
}

export interface MediaSearchTypes {
  movieSearch: MediaDataSearchBarTypes[];
}

export interface PersonMoviesTVShowTypes extends MovieData {
  character: string;
  first_air_date: string;
  releaseDate: string;
}
interface HeaderLink {
  mediaType: string;
  link: string;
}
export interface HeaderTypes {
  headerLinks: HeaderLink[];
}
