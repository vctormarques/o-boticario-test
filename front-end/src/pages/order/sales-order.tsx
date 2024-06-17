import Layout from 'components/template/layout';
import { endpoints } from 'services/api';
import { useEffect, useState } from 'react';
import Header from 'components/header/header';
import { IOrderRequest } from 'interfaces/order.interface';
import { IProduct } from 'interfaces/product.interface';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { IClient } from 'interfaces/client.interface';
import {
  Box,
  FormControl,
  FormLabel,
  useToast,
  GridItem,
  Grid,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  Flex
} from '@chakra-ui/react';
import ProductSelectGrid from 'components/order/product-order';
import {
  IProductOrderRequest
} from 'interfaces/product-order.interface';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { masker } from 'helpers/masker';

export default function SalesOrderPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control: orderControl
  } = useForm<IOrderRequest>();

  const { control } = useForm<IProductOrderRequest>();
  const navigate = useNavigate();
  const toast = useToast();
  const [customers, setCustomers] = useState<IClient[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [newProducts, setNewProducts] = useState([]);
  const { fields, append, remove } = useFieldArray<IProductOrderRequest>({
    control: control,
    // @ts-ignore
    name: 'name'
  });
  const [productOrderFields, setProductOrderFields] = useState<
    IProductOrderRequest[]
  >([]);

  useEffect(() => {
    endpoints.client
      .list()
      .then((result) => {
        setCustomers(result);
      })
      .catch((error) => {
        toast({
          title: 'Erro ao carregar clientes',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      });

    endpoints.product
      .list()
      .then((result) => {
        setProducts(result);
      })
      .catch((error) => {
        toast({
          title: 'Erro ao carregar produtos',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      });
  }, [toast]);

  const searchNameProduct = (produto_id: number): string | undefined => {
    const product = products.find(
      (p) => p.produto_id === parseInt(produto_id.toString())
    );
    return product ? product.nome_produto : 'Produto não encontrado';
  };

  const handleAddProduct = (data: any) => {
    const nome_produto = searchNameProduct(data.produto_id);
    const payload: IProductOrderRequest = {
      ...data,
      nome_produto: nome_produto || ''
    };

    setProductOrderFields([...productOrderFields, payload]);
  };

  const handleRemoveProduct = (index: number) => {
    remove(index);
    const updatedFields = [...productOrderFields];
    updatedFields.splice(index, 1);
    setProductOrderFields(updatedFields);
  };

  const calculateTotal = () => {
    return productOrderFields
      .reduce((total, item) => {
        return total + item.qtd_produto_pedido * item.preco_produto_pedido;
      }, 0)
      .toFixed(2);
  };

  const onSubmit = (data: IOrderRequest) => {
    const numero_pedido = new Date().getTime();
    const totalOrder = calculateTotal();

    const payloadOrder = {
      numero_pedido: numero_pedido,
      valor_total_pedido: masker.money_to_Float(totalOrder),
      cliente_id: parseInt(data.cliente_id.toString()),
      produtos: productOrderFields.map((item) => ({
        produto_id: item.produto_id,
        qtd_produto_pedido: item.qtd_produto_pedido,
        preco_produto_pedido: item.preco_produto_pedido
      }))
    };

    endpoints.order
      .create(payloadOrder)
      .then((result) => {
        toast({
          title: 'Success',
          description: 'Pedido criado com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        navigate('/order');
      })
      .catch((errors) => {
        toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      });

    reset();
  };

  return (
    <Layout>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mx="auto"
        p={3}
        paddingTop={5}
      >
        <Header title="Novo pedido" />

        <Box p={5}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem colSpan={2}>
              <FormControl mb={4}>
                <FormLabel>Cliente</FormLabel>
                <Select
                  {...register('cliente_id', {
                    required: 'Este campo é obrigatório'
                  })}
                  isInvalid={!!errors.cliente_id}
                >
                  <option value="">Selecione...</option>
                  {customers.map((client) => (
                    <option key={client.cliente_id} value={client.cliente_id}>
                      {client.nome}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
          </Grid>

          <ProductSelectGrid
            products={products}
            onAddProduct={handleAddProduct}
          />

          {productOrderFields.length > 0 && (
            <Box mt={8}>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Produto</Th>
                    <Th>Quantidade</Th>
                    <Th>Valor</Th>
                    <Th>Remover do Pedido</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productOrderFields.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.nome_produto}</Td>
                      <Td>{item.qtd_produto_pedido}</Td>
                      <Td>{item.preco_produto_pedido}</Td>
                      <Td>
                        <IconButton
                          aria-label="Remover"
                          icon={<DeleteIcon />}
                          onClick={() => handleRemoveProduct(index)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
          {productOrderFields.length > 0 && (
            <Flex justifyContent="flex-end" mt={4}>
              <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>
                Finalizar Pedido
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    </Layout>
  );
}
