import { useContext } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ResearcherForm from './ResearcherForm';

const ResearchersModal = ({ isOpen, onClose } : { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Researchers</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ResearcherForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ResearchersModal;
