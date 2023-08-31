interface Card {
  description?: string;
  releaseDate?: string;
  rating?: number;
  imgSrc?: string;
  title?: string;
  id?: number;
  vote_average?: number;
  poster_path?: string;
  release_date?: number;
  overview?: string;
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  popularity?: number;
}
export default Card;
