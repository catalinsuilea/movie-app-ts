export const getMediaType = (type: string, gender?: number) => {
  switch (type) {
    case "movie":
      return "Movie";
    case "tv":
      return "TV Series";
    case "person":
      if (gender === 1) {
        return "Actress";
      } else {
        return "Actor";
      }
    default:
      return "No type";
  }
};

export const getCardRoute = (name: string, id: number, mediaType: string) => {
  switch (mediaType) {
    case "person":
      return `/person/${name}/${id}`;
    case "movie":
    case "tv":
      return `/${mediaType}/${name}/${id}`;
    default:
      return `/movie/${name}/${id}`;
  }
};
