import React, { useEffect } from 'react';
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
  useToast,
  GridItem,
  Grid
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ICategoryRequest, ICategory } from 'interfaces/category.interface';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (payload: ICategoryRequest, id: string) => void;
  category: ICategory | null;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  category
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ICategoryRequest>();
  const toast = useToast();

  useEffect(() => {
    if (category) {
      reset({
        nome_categoria: category.nome_categoria,
        descricao_categoria: category.descricao_categoria
      });
    }
  }, [category, reset]);

  const onSubmit = (data: ICategoryRequest) => {
    if (category?.categoria_id !== undefined) {
      onEdit(data, category.categoria_id.toString());
    }
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Categoria</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={2}>
                <FormControl mb={4}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    {...register('nome_categoria', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.nome_categoria}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl mb={4}>
                  <FormLabel>Descrição</FormLabel>
                  <Input
                    {...register('descricao_categoria')}
                    isInvalid={!!errors.descricao_categoria}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCategoryModal;
