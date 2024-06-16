import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { ICategoryRequest } from 'interfaces/category.interface';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (category: ICategoryRequest) => void;
}

const CreateCategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [category, setCategory] = useState<ICategoryRequest>({
    nome_categoria: '',
    descricao_categoria: ''
  });
  const [description, setDescription] = useState('');
  const toast = useToast();

  const handleCreateCategory = () => {
    if (!category.nome_categoria.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um nome válido.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    onCreate(category);
    onClose();
    setCategory({
      nome_categoria: '',
      descricao_categoria: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Categoria</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input
              value={category.nome_categoria}
              onChange={(e) =>
                setCategory({ ...category, nome_categoria: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descrição</FormLabel>
            <Input
              value={category.descricao_categoria}
              onChange={(e) =>
                setCategory({
                  ...category,
                  descricao_categoria: e.target.value
                })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={handleCreateCategory}>
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCategoryModal;
