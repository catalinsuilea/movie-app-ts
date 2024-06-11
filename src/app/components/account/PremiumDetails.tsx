import React from "react";
import {
  ChakraProvider,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Text,
} from "@chakra-ui/react";
import { PricingModal } from "./PricingModal";

interface Premium {
  handleBuyPremium: (offer: string, price: number) => void;
}

export const PremiumDetails = ({ handleBuyPremium }: Premium) => {
  return (
    <>
      <Box
        padding="2rem 0.5rem"
        maxW="600px"
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Text fontWeight="bold" fontSize="lg" mb={4} textAlign="left">
          Explore Premium
        </Text>
        <Accordion allowToggle>
          <AccordionItem textAlign="left">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  With premium you can:
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box mb={4}>
                <Text fontWeight="bold">See detailed Industry Data:</Text>
                <Text>
                  More comprehensive data on movies, TV shows, cast, and crew,
                  including contact information and representation details.
                </Text>
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold">Industry Insights:</Text>
                <Text>
                  Gain access to industry news, box office data, and trends that
                  can be valuable for professionals in the entertainment
                  industry.
                </Text>
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold">Advanced Search Tools:</Text>
                <Text>
                  Enhanced search capabilities to find talent, projects, and
                  companies more efficiently.
                </Text>
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold">Personal Profile Management:</Text>
                <Text>
                  The ability to manage and customize your own MoviePilotPROApp
                  profile, which is useful for actors, filmmakers, and other
                  industry professionals.
                </Text>
              </Box>
              <Box mb={4}>
                <Text fontWeight="bold">Casting Notices and Job Listings:</Text>
                <Text>
                  Access to casting calls, job listings, and other industry
                  opportunities.
                </Text>
              </Box>
              <Box mt={4} w="full">
                <PricingModal handleBuyPremium={handleBuyPremium} />
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};
