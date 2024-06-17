import React, { useEffect, useState } from 'react';
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
  Grid,
  Toast,
  Select
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
  IProductCreateModalProps,
  IProductRequest
} from 'interfaces/product.interface';
import { ICategory } from 'interfaces/category.interface';
import { FormatFieldMoney } from 'helpers/formatters';
import { endpoints } from 'services/api';
import UploadComponent from 'components/upload/upload-container';

const CreateProductModal: React.FC<IProductCreateModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IProductRequest>();
  const toast = useToast();

  const [payload, setPayload] = useState<IProductRequest>({
    nome_produto: '',
    descricao_produto: '',
    categoria_id: 0,
    qtd_estoque: 0,
    preco_produto: 0,
    imagem: null
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resetUploadComponent, setResetUploadComponent] = useState(false);

  const handleFileChange = (file: File | null) => {
    setPayload({ ...payload, imagem: file });
    setUploadedFile(file);
  };

  const handleResetUploadComponent = () => {
    setResetUploadComponent((prevState) => !prevState);
  };

  const onSubmit = (data: IProductRequest) => {
    let productData = {
      ...data,
      imagem: uploadedFile
    };

    reset();
    onCreate(productData);
    onClose();
    setPayload({
      nome_produto: '',
      descricao_produto: '',
      categoria_id: 0,
      qtd_estoque: 0,
      preco_produto: 0,
      imagem: null
    });
    setUploadedFile(null);
    handleResetUploadComponent();
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    endpoints.category
      .list()
      .then((result) => {
        setCategories(result);
      })
      .catch((errors) => {
        Toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      });
  }, [toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    {...register('nome_produto', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.nome_produto}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Descrição</FormLabel>
                  <Input {...register('descricao_produto')} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Preço</FormLabel>
                  <Input
                    {...register('preco_produto', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.preco_produto}
                    onInput={FormatFieldMoney}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Estoque</FormLabel>
                  <Input
                    type="number"
                    {...register('qtd_estoque', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.qtd_estoque}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl mb={4}>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    {...register('categoria_id', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.categoria_id}
                  >
                    <option value="">Selecione...</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoria_id}
                        value={category.categoria_id}
                      >
                        {category.nome_categoria}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormLabel>Upload</FormLabel>
                <UploadComponent
                  onFileChange={handleFileChange}
                  resetComponent={resetUploadComponent}
                />
              </GridItem>
            </Grid>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;
