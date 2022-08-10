import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from "./components/buttonStyles";
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
});
export const afterTheme = extendTheme({
  _after: {
    content: `""`,
    position: "absolute",
    width: "100%",
    height: "100%",
    bg: "black",
    top: "0",
    left: "0",
    right: "0",
    opacity: "0.7",
    zIndex: "-1",
  },
});
