import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { HeaderDesktop } from "../Header/HeaderDesktop";
import { HeaderMobile } from "../Header/HeaderMobile";
import { useDeviceTypeContext } from "../../contexts/useDeviceTypeContext";

const Header = () => {
  const { isMobile } = useDeviceTypeContext();
  const [linkActive, setLinkActive] = useState("");
  const headerLinks = [
    { mediaType: "movie", link: "Movie" },
    { mediaType: "tv", link: "Tv Shows" },
    { mediaType: "person", link: "People" },
  ];

  return (
    <Box
      zIndex="2"
      background="linear-gradient(to right, #141e30, #243b55)"
      height="80px"
      position="relative"
    >
      {isMobile ? (
        <HeaderMobile
          linkActive={linkActive}
          setLinkActive={setLinkActive}
          headerLinks={headerLinks}
        />
      ) : (
        <HeaderDesktop
          linkActive={linkActive}
          setLinkActive={setLinkActive}
          headerLinks={headerLinks}
        />
      )}
    </Box>
  );
};
export default Header;
