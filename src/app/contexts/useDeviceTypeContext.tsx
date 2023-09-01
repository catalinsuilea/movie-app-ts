import React, { useContext, createContext } from "react";

import { useBreakpointValue } from "@chakra-ui/react";

interface DeviceTypeProps {
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop: boolean;
}

const DeviceTypeContext = createContext<DeviceTypeProps>({} as DeviceTypeProps);

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
    lg: true,
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
