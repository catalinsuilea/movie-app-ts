import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

interface Premium {
  handleBuyPremium: (offer: string, price: number) => void;
}

export const PricingModal = ({ handleBuyPremium }: Premium) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={5} textAlign="center">
      <Button colorScheme="teal" onClick={onOpen}>
        View Pricing
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Premium Pricing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              mb={4}
            >
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                Payment Test Information
              </Text>
              <Text>
                Use the following test credentials to complete the payment:
              </Text>
              <Text mt={2}>
                <strong>Card Number:</strong> 4242 4242 4242 4242
              </Text>
              <Text>
                <strong>Expiration Date:</strong> Any future date
              </Text>
              <Text>
                <strong>Card Holder Name:</strong> Any name
              </Text>
              <Text>
                <strong>Security Code:</strong> Any 3-digit number
              </Text>
            </Box>
            <SimpleGrid columns={1} spacing={4}>
              <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Basic Plan
                </Text>
                <Text>$9.99 / month</Text>
                <Text mt={2}>
                  Access to basic features and ad-free experience.
                </Text>
                <Button
                  colorScheme="teal"
                  mt={4}
                  onClick={() => handleBuyPremium("Basic Plan", 9.99)}
                >
                  Buy Basic Plan
                </Button>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Standard Plan
                </Text>
                <Text>$19.99 / month</Text>
                <Text mt={2}>
                  Includes all features of Basic Plan plus additional tools and
                  higher quality streaming.
                </Text>
                <Button
                  colorScheme="teal"
                  mt={4}
                  onClick={() => handleBuyPremium("Standard Plan", 19.99)}
                >
                  Buy Standard Plan
                </Button>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Premium Plan
                </Text>
                <Text>$29.99 / month</Text>
                <Text mt={2}>
                  All features included in Standard Plan plus exclusive content
                  and priority support.
                </Text>
                <Button
                  colorScheme="teal"
                  mt={4}
                  onClick={() => handleBuyPremium("Premium Plan", 29.99)}
                >
                  Buy Premium Plan
                </Button>
              </Box>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
