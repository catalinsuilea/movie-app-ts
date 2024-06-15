import { CrewMember, GuestStar } from "./TvEpisodeDetails";
import { TVShowTypes } from "./TvTypes";

interface MovieInfo extends TVShowTypes {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3116_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_3116_1: string;
    name: string;
  }[];
  status: string;
  title?: string;
  video: false;
  vote_average: number;
  vote_count: number;
  tagline: string | undefined;
  name: string;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  still_path: string;
  crew: CrewMember[];
  member: GuestStar[];
  air_date: string;
}
export default MovieInfo;

export interface PhotosTypes {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface TrailersTypes {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface CustmoCarouselTypes {
  data: TrailersTypes[] | PhotosTypes[];
  componentName: string;
  slidesToScroll: number;
  wrapAround?: boolean;
  slidesToShow: number;
  autoplay?: boolean;
  pagingDotsStyle?: { fill: string };
  leftControlStyles?: {};
  rightControlStyles?: {};
  buttonStyles?: {};
}
