import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';
import ProductOrderTable from 'components/product/product-order-table';
import { IProductOrder } from 'interfaces/product-order.interface';

interface ViewProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  products: IProductOrder[];
}

const ViewProductsModal: React.FC<ViewProductsModalProps> = ({
  isOpen,
  onClose,
  title,
  products
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProductOrderTable products={products} />
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewProductsModal;
