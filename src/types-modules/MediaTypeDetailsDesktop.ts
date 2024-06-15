import { MovieData } from "./HomepageTypes/HomepageTypes";
import Cast from "../types-modules/Cast";
import Crew from "../types-modules/Crew";
import { MoviePropsFavourites } from "./MovieProps";

interface CastInfo {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
}
// Includes movies and tv shows data
interface MediaData extends MovieData {
  tagline?: string;
  genres: { id: number; name: string }[];
  runtime: number;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  status: string;
  still_path: string;
}

export interface MediaTypeDetailsDesktopTypes {
  data: MediaData;
  isDesktop: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  mediaType?: string;
  castInfo: CastInfo;
  handleVoteCount: (vote: number) => void;
  checkUserState: (modalType?: string) => void;
  checkIsFavourite: (id: string | number) => void;
  handleFavourites: (movie: MoviePropsFavourites, media_type?: string) => void;
  isFavourite: boolean;
}
