import Layout from 'components/template/layout';
import { Box, Heading, useToast, useBoolean } from '@chakra-ui/react';
import { endpoints } from 'services/api';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from 'store/auth.context';
import Header from 'components/header/header';
import ConfirmModal from 'components/modal/confirm-delete-modal';
import { IProduct, IProductRequest } from 'interfaces/product.interface';
import ProductTable from 'components/product/product-table';
import CreateProductModal from 'components/product/create-product-modal';
import { masker } from 'helpers/masker';

export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();
  const { userState } = useContext(UserAuthContext);
  const [isModalOpen, setIsModalOpen] = useBoolean(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useBoolean(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    setIsLoading.on();
    endpoints.product
      .list()
      .then((result) => {
        setProducts(result);
      })
      .catch((errors) => {
        console.log('erros', errors);
        toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoading.off();
      });
  }, [setIsLoading, toast, userState.accessToken]);

  const handleDelete = (index: number) => {
    setSelectedProductIndex(index);
    setIsModalOpen.on();
  };

  const handleCreate = () => {
    setIsCreateModalOpen.on();
  };

  const handleCreateProduct = (payload: IProductRequest) => {
    const formData = new FormData();
    if (payload.imagem) {
      formData.append('imagem', payload.imagem);
    }
    formData.append('nome_produto', payload.nome_produto);
    formData.append('descricao_produto', payload.descricao_produto);
    formData.append('categoria_id', String(payload.categoria_id));
    formData.append('qtd_estoque', String(payload.qtd_estoque));
    formData.append('preco_produto', payload.preco_produto.toString());
    setIsLoading.on();
    endpoints.product
      .create(formData)
      .then((result) => {
        toast({
          title: 'Success',
          description: 'Produto criado com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setProducts([...products, result]);
      })
      .catch((errors) => {
        console.log('Erro ao salvar', errors);
        toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoading.off();
        setIsModalOpen.off();
      });
  };

  const confirmDelete = () => {
    if (selectedProductIndex !== null) {
      setIsLoading.on();
      endpoints.product
        .delete(selectedProductIndex)
        .then((result) => {
          toast({
            title: 'Success',
            description: result.message,
            status: 'success',
            duration: 5000,
            isClosable: true
          });

          setProducts((prevProducts) =>
            prevProducts.filter(
              (product) => product.produto_id !== selectedProductIndex
            )
          );
        })
        .catch((errors) => {
          toast({
            title: 'Erro',
            description: errors.message,
            status: 'error',
            duration: 5000,
            isClosable: true
          });
        })
        .finally(() => {
          setIsLoading.off();
        });

      setIsModalOpen.off();
    }
  };

  return (
    <Layout>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen.off}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        body="Você tem certeza que deseja excluir este produto?"
      />
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={setIsCreateModalOpen.off}
        onCreate={handleCreateProduct}
      />
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mx="auto"
        p={3}
        paddingTop={5}
      >
        <Header
          title="Produtos"
          titleButton="Cadastrar"
          onButton={handleCreate}
        />

        <Box p={5}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mx="auto"
            p={4}
          >
            {products.length > 0 ? (
              <ProductTable customers={products} onDelete={handleDelete} />
            ) : (
              <Heading size="sm" color="gray.600">
                Nenhum produto encontrado.
              </Heading>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
