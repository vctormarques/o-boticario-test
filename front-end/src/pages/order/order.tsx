import Layout from 'components/template/layout';
import { Box, Heading, useToast, useBoolean } from '@chakra-ui/react';
import { endpoints } from 'services/api';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from 'store/auth.context';
import Header from 'components/header/header';
import { IOrder } from 'interfaces/order.interface';
import OrderTable from 'components/order/order-table';
import ViewProductsModal from 'components/order/view-products-modal';
import { IProductOrder } from 'interfaces/product-order.interface';
import { useNavigate } from 'react-router-dom';

export default function OrderPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();
  const { userState } = useContext(UserAuthContext);
  const [isModalOpen, setIsModalOpen] = useBoolean(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(
    null
  );
  const [products, setProducts] = useState<IProductOrder[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading.on();
    endpoints.order
      .list()
      .then((result) => {
        setOrders(result);
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

  const handleView = (index: number) => {
    setSelectedOrderIndex(index);
    endpoints.order
      .viewProd(index)
      .then((result) => {
        setProducts([...result]);
      })
      .catch((errors) => {
        console.log('Erro ao buscar produtos', errors);
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
        setIsModalOpen.on();
      });
  };

  const handleCreate = () => {
    navigate('/sales-order');
  };

  return (
    <Layout>
      <ViewProductsModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen.off}
        products={products}
        title="Visualizar produtos"
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
          title="Pedidos"
          titleButton="Novo Pedido"
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
            {orders.length > 0 ? (
              <OrderTable orders={orders} onView={handleView} />
            ) : (
              <Heading size="sm" color="gray.600">
                Nenhum pedido encontrado.
              </Heading>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
