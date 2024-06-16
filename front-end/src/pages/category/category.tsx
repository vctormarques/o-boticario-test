import Layout from 'components/template/layout';
import {
  Box,
  Heading,
  useToast,
  useBoolean,
} from '@chakra-ui/react';
import { endpoints } from 'services/api';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from 'store/auth.context';
import Header from 'components/header/header';
import CategoryTable from 'components/category/category-table';
import ConfirmModal from 'components/modal/confirm-delete-modal';
import { ICategory } from 'interfaces/category.interface';

export default function CategoryPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();
  const { userState } = useContext(UserAuthContext);
  const [isModalOpen, setIsModalOpen] = useBoolean(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    setIsLoading.on();
    endpoints.category
      .list(userState.accessToken)
      .then((result) => {
        setCategories(result);
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
    setSelectedCategoryIndex(index);
    setIsModalOpen.on();
  };

  const confirmDelete = () => {
    if (selectedCategoryIndex !== null) {
      setIsLoading.on();
      endpoints.category
        .delete(selectedCategoryIndex)
        .then((result) => {
          toast({
            title: 'Success',
            description: result.message,
            status: 'success',
            duration: 5000,
            isClosable: true
          });

          setCategories((prevCategories) =>
            prevCategories.filter(
              (category) => category.categoria_id !== selectedCategoryIndex
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
        body="Você tem certeza que deseja excluir esta categoria?"
      />
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mx="auto"
        p={3}
        paddingTop={5}
      >
        <Header title="Categorias" titleButton="Cadastrar" />

        <Box p={5}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mx="auto"
            p={4}
          >
            {categories.length > 0 ? (
              <CategoryTable categories={categories} onDelete={handleDelete} />
            ) : (
              <Heading size="sm" color="gray.600">
                Nenhuma categoria encontrada.
              </Heading>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
