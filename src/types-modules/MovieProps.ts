import { MovieData } from "./HomepageTypes/HomepageTypes";
import MovieInfo from "./MovieInfo";

export interface MoviePropsFavourites {
  title?: string;
  id: number;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
  media_type?: string;
}
