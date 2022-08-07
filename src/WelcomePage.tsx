import React, { useState } from "react";
import { Box, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Outlet } from "react-router-dom";
import PlacementExample from "./Drawer";

const WelcomePage = () => {
  return (
    <Box margin="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box fontSize="26px" letterSpacing="1.5px">
          <h1 data-testid="h1Id">Discover</h1>
        </Box>
        <Box display="flex">
          <Box>
            <Input
              borderTopRightRadius="0"
              borderBottomRightRadius="0"
              size="lg"
              placeholder="Search movie..."
              width="70vw"
            />
          </Box>
          <Box>
            <IconButton
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              size="lg"
              aria-label="Search database"
              isActive={true}
              icon={<SearchIcon />}
            />
          </Box>
        </Box>
      </Box>
      <Box mt="20px">
        <PlacementExample />
      </Box>
      <Outlet />
    </Box>
  );
};
export default WelcomePage;
