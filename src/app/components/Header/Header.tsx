import React from "react";
import { Box } from "@chakra-ui/react";
import { HeaderDesktop } from "../Header/HeaderDesktop";
import { HeaderMobile } from "../Header/HeaderMobile";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";

const Header = () => {
  const { isMobile } = useDeviceTypeContext();

  return (
    <Box
      zIndex="2"
      background="linear-gradient(to right, #141e30, #243b55)"
      height="80px"
      position="relative"
    >
      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
    </Box>
  );
};
export default Header;
