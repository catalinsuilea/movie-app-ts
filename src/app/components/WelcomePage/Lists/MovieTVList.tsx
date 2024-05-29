import React, { useMemo } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Skeleton,
  SkeletonText,
  Heading,
  Text,
} from "@chakra-ui/react";
import { PersonCardDetails } from "../../MovieDetails/PersonCardDetails";
import {
  MovieDetailsTheme,
  WelcomePageTheme,
  afterTheme,
} from "../../../../styles/theme";

const MovieTVList = ({
  data,
  tabs,
  isLoading,
  description,
  getRandomImage,
  handleTabClick,
  tabType,
}: any) => {
  const randomImageMemoized = useMemo(() => {
    if (!getRandomImage) return;
    return getRandomImage(data);
  }, [data, getRandomImage]);

  return (
    <Box width="100%">
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        sx={
          tabType === "trending"
            ? {
                backgroundImage: `url(https://www.themoviedb.org/t/p/w780/${randomImageMemoized})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "65% 35%",
              }
            : {}
        }
        {...(tabType === "trending"
          ? WelcomePageTheme.moviePosterContainer
          : {})}
        {...(tabType === "trending" ? afterTheme.searchContainer : {})}
        p="4"
      >
        <Flex overflowX="auto" alignItems="center" gap="1.5rem">
          <Heading
            color={tabType === "trending" ? "#fff" : "black"}
            fontSize="xl"
            as="h2"
          >
            {description}
          </Heading>
          <TabList>
            <Flex borderRadius="30px" border="1px solid #00f260">
              {tabs.map((tab: string) => (
                <Tab
                  color={tabType === "trending" ? "#fff" : "black"}
                  key={tab}
                  fontSize="sm"
                  p="8px 16px"
                  onClick={() => {
                    handleTabClick(tab, tabType);
                  }}
                >
                  <Text width="max-content">{tab}</Text>
                </Tab>
              ))}
            </Flex>
          </TabList>
        </Flex>
        <TabPanels>
          {tabs.map((tab: string, index: number) => (
            <TabPanel key={`${tab}-${index}`}>
              <Flex overflowX="auto" position="relative" w="100%" mt="4">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  bottom="0"
                  w="20px"
                  zIndex="1"
                  pointerEvents="none"
                  css={{
                    backdropFilter: "blur(10px)",
                    // background:
                    //   "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  }}
                />
                <Flex
                  css={MovieDetailsTheme.customScrollBar}
                  w="100%"
                  pr="20px"
                  pl="20px"
                  pb="2.25rem"
                  overflowX="scroll"
                >
                  {isLoading
                    ? new Array(10).fill("").map((_, index) => (
                        <Box key={index} p="4" w="200px" mr="4">
                          <Skeleton height="250px" width="170px" mb="4" />
                          <SkeletonText mt="4" noOfLines={2} spacing="4" />
                        </Box>
                      ))
                    : data.map((movie: any, index: number) => (
                        <PersonCardDetails
                          key={index}
                          data={movie}
                          index={index}
                          isMovieTVList
                          tabType={tabType}
                        />
                      ))}
                </Flex>
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  bottom="0"
                  w="20px"
                  zIndex="1"
                  pointerEvents="none"
                  css={{
                    backdropFilter: "blur(5px)",
                    // background:
                    //   "linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  }}
                />
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default React.memo(MovieTVList, (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.tabs === nextProps.tabs
  );
});
