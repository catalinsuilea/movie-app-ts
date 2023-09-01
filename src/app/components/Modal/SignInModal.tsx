import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface SignInModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const SignInModal = ({
  isModalOpen,
  onCloseModal,
}: SignInModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal isCentered isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent m="0 16px">
        <ModalHeader>Favourites</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Sign In in order to see favourites. No account? Register for free!
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center" gap="12px">
          <Button
            width="100%"
            colorScheme="blue"
            onClick={() => navigate("/signUp")}
          >
            Register
          </Button>
          <Button
            width="100%"
            colorScheme="blue"
            onClick={() => navigate("/signIn")}
          >
            Sign In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
