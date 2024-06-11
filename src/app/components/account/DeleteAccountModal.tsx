import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from "@chakra-ui/react";

interface DeleteModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  handleDeleteAccount: (userId: string | undefined) => void;
  cancelPremium: (userId: string | undefined) => void;
  userId?: string;
  modalType: string;
}

export const DeleteAccountModal = ({
  isModalOpen,
  onCloseModal,
  handleDeleteAccount,
  cancelPremium,
  userId,
  modalType,
}: DeleteModalProps) => {
  const modalHeader =
    modalType === "cancel-premium"
      ? "Cancel premium subscription"
      : " Delete account";
  const modalBody =
    modalType === "cancel-premium"
      ? "Canceling premium will end its benefits as well. Are you sure?"
      : "  Are you sure you want to delete your account? This can be undone.";

  const actionButton =
    modalType === "cancel-premium" ? "Cancel premium" : "Delete";

  return (
    <Modal isCentered isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent m="0 16px">
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{modalBody}</Text>
        </ModalBody>

        <ModalFooter justifyContent="center" gap="12px">
          <Button
            width="100%"
            colorScheme="blue"
            variant="ghost"
            onClick={() => onCloseModal()}
          >
            Close
          </Button>
          <Button
            width="100%"
            colorScheme="blue"
            onClick={() => {
              modalType === "delete-account"
                ? handleDeleteAccount(userId)
                : cancelPremium(userId);
              onCloseModal();
            }}
          >
            {actionButton}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
