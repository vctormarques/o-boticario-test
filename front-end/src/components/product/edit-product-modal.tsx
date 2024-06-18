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
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IProductRequest,  IEditProductModalProps } from 'interfaces/product.interface';
import { ICategory } from 'interfaces/category.interface';
import { FormatFieldMoney } from 'helpers/formatters';
import { endpoints } from 'services/api';
import UploadComponent from 'components/upload/upload-container';

const EditProductModal: React.FC<IEditProductModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  product,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IProductRequest>();
  const toast = useToast();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resetUploadComponent, setResetUploadComponent] = useState(false);

  useEffect(() => {
    if (product) {
      reset({
        nome_produto: product.nome_produto,
        descricao_produto: product.descricao_produto,
        preco_produto: product.preco_produto,
        qtd_estoque: product.qtd_estoque,
        categoria_id: product.categoria.categoria_id,
      });
    }
  }, [product, reset]);

  useEffect(() => {
    endpoints.category
      .list()
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => {
        toast({
          title: 'Erro',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
  };

  const handleResetUploadComponent = () => {
    setResetUploadComponent((prevState) => !prevState);
  };

  const onSubmit = (data: IProductRequest) => {
    const preco_produto = parseFloat(data.preco_produto.toString());
    const formData = new FormData();
    if (uploadedFile) {
      formData.append('imagem', uploadedFile);
    }
    formData.append('nome_produto', data.nome_produto);
    formData.append('descricao_produto', data.descricao_produto);
    formData.append('categoria_id', String(data.categoria_id));
    formData.append('qtd_estoque', String(data.qtd_estoque));
    formData.append('preco_produto', String(preco_produto));
    
    if (product?.produto_id !== undefined) {
      onEdit(formData, product.produto_id.toString());
    }
    onClose();
    reset();
    setUploadedFile(null);
    handleResetUploadComponent();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    {...register('nome_produto', {
                      required: 'Este campo é obrigatório',
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
                      required: 'Este campo é obrigatório',
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
                      required: 'Este campo é obrigatório',
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
                      required: 'Este campo é obrigatório',
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
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
