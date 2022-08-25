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
  justifyContent: "center",
  alignItems: "center",
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
    color: "#fff",
  },
  linksContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    left: "50%",
    transform: "translate(0,10%)",
    margin: "0 4em",
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
