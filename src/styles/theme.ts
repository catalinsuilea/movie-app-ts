import { extendTheme } from "@chakra-ui/react";

export const myNewTheme = extendTheme({
  colors: {
    primary: "#845EC2",
    secondary: "#FF6F91",
    highlight: "#00C9A7",
    warning: "#FFC75F",
    danger: "#C34A36",
  },
  components: {},
});
export const flexTheme = extendTheme({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: { base: "start", md: "center", xl: "center" },
  sx: { "& .slider-frame": { overflowY: "visible !important" } },
});
export const afterTheme = extendTheme({
  demo: {
    _after: {
      content: `""`,
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "black",
      top: "0",
      left: "0",
      right: "0",
      opacity: "0.7",
      zIndex: "-1",
    },
  },
  searchContainer: {
    _after: {
      content: `""`,
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "linear-gradient(to right, #000428, #004e92)",
      top: "0",
      left: "0",
      right: "0",
      opacity: "0.7",
      zIndex: "-1",
    },
  },
  carousel: {
    _after: {
      content: `""`,
      position: "absolute",
      width: "100%",
      height: "100%",
      background: "black",
      top: "0",
      left: "0",
      right: "0",
      opacity: "0.5",
      zIndex: "1",
    },
  },
});
export const MovieCardTheme = extendTheme({
  display: "flex",
  justifyContent: "flex-start",
  margin: "10px auto",
  p: "0",
  boxShadow: "0 0 4px 2px rgba(0,0,0,0.2)",
  borderRadius: "10px",
  _hover: {
    cursor: "pointer",
    boxShadow: "0 0 6px 4px rgba(0,0,0,0.2)",
  },
});

export const HeaderTheme = extendTheme({
  link: {
    fontSize: "19px",
    textDecoration: "none",
    marginRight: "25px",
    _last: { mr: "unset" },
    color: "#fff",
    fontWeight: 500,
  },
  linksContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transform: "translate(0,10%)",
    margin: "0 5em",
  },
});
export const SignUpTheme = extendTheme({
  heading: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: "#4286f4",
    color: "#fff",
    fontSize: "22px",
    p: "20px 10px",
    textAlign: "left",
  },
  benefits: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    textAlign: "left",
  },
});
export const SearchBarTheme = extendTheme({
  welcomeText: {
    textAlign: "left",
    fontWeight: "700",
    fontSize: "44px",
    color: "#fff",
    letterSpacing: "1.2px",
  },
  paragraphText: {
    letterSpacing: "1.1px",
    textAlign: "left",
    fontSize: "34px",
    color: "#fff",
  },
});

export const WelcomePageTheme = extendTheme({
  moviePosterContainer: {
    position: "relative",
    height: "auto",
    backgroundRepeat: "no-repeat",
    backgroundSize: " 100% 100%",
    objectFit: "cover",
    zIndex: "1",
  },
});

export const MovieDetailsTheme = extendTheme({
  imgMovieDescription: {
    width: "auto",
    margin: { lg: "20px" },
  },
  movieInfo: {
    textAlign: "left",
    m: { md: "20px", lg: "unset" },
    mt: { base: "unset", lg: "-25px" },
    width: { md: "100%", lg: "70%" },
    display: "flex",
    flexDirection: "column",
    gap: { lg: "16px" },
  },
  movieDetails: {
    display: "flex",
    justifyContent: " flex-start",
    alignItems: " center",
    mt: "12px",
    flexDirection: { base: "column", md: "row" },
  },
  charcacterCard: {
    boxShadow: "1px 1px 6px 4px rgba(0, 0, 0, 0.1)",
    margin: " 10px",
    borderRadius: "15px",
    cursor: "pointer",
  },
  charactersCardsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowY: "hidden",
    overflowX: "scroll",
    m: { lg: "12px 0 24px 0" },
  },
  img: {
    width: "165px",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
  characterNames: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "8px 0",
    fontSize: "15px",
    textAlign: "center",
    height: "55px",
    width: "160px",
  },
  crew: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: { md: "12px auto", lg: "unset" },
  },
  movieCrew: {
    justifyContent: "space-evenly",
    alignItems: "start",
    widh: "100%",
    mt: "16px",
    p: { md: "16px", xl: "unset" },
    flexWrap: "wrap",
  },
  customScrollBar: {
    "&::-webkit-scrollbar": { height: "6px" },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "& > *": { marginRight: "8px" },
    "& > *:last-child": { marginRight: "0" },
  },
});
