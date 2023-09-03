import React from "react";
import {
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        py={[1, 2, 2]}
        borderRadius={5}
        aria-label="Courses"
        fontWeight="700"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        textDecoration="none"
      >
        Movies
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <Link to="/movie-app-ts/top-rated-movies">
          <MenuItem color="black">Rating</MenuItem>{" "}
        </Link>
        <Link to="/movie-app-ts/genres">
          <MenuItem color="black">Genres</MenuItem>{" "}
        </Link>
      </MenuList>
    </Menu>
  );
}
