interface MovieInfo {
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
  original_title: string;
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
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  tagline: string | undefined;
  name: string;
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  still_path: string;
  crew: any;
  air_date: string;
  member: any;
}
export default MovieInfo;
