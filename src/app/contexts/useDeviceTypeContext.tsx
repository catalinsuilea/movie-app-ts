import React, { useContext, createContext } from "react";

import { useBreakpointValue } from "@chakra-ui/react";

const DeviceTypeContext = createContext<any>(false);

export const DeviceTypeProvider = ({ children }: any) => {
  const isMobile = useBreakpointValue({
    base: true,
    xs: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });

  const isTablet = useBreakpointValue({
    base: false,
    xs: false,
    sm: false,
    md: true,
    lg: false,
    xl: false,
  });

  const isDesktop = !isMobile && !isTablet;
  return (
    <DeviceTypeContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </DeviceTypeContext.Provider>
  );
};

export const useDeviceTypeContext = () => useContext(DeviceTypeContext);
