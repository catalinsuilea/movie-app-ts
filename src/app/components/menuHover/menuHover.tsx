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
        More
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <Link to="/favourites">
          <MenuItem color="black">Favourites</MenuItem>{" "}
        </Link>
      </MenuList>
    </Menu>
  );
}
