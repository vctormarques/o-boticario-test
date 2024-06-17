import { IProduct } from 'interfaces/product.interface';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Grid,
  Select,
  Button,
  Flex
} from '@chakra-ui/react';
import { IProductOrderRequest } from 'interfaces/product-order.interface';
import { FormatFieldMoney } from 'helpers/formatters';
import { PlusCircleOutlined } from '@ant-design/icons';

const ProductSelectGrid: React.FC<{
  products: IProduct[];
  onAddProduct: (data: any) => void;
}> = ({ products, onAddProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IProductOrderRequest>();

  const handleAddProduct = (data: any) => {
    onAddProduct(data);
    reset();
  };

  return (
    <Grid templateColumns="1fr 1fr 1fr" gap={4}>
      <GridItem>
        <FormControl mb={4}>
          <FormLabel>Produto</FormLabel>
          <Select
            {...register('produto_id', {
              required: 'Este campo é obrigatório'
            })}
            isInvalid={!!errors.produto_id}
          >
            <option value="">Selecione um produto...</option>
            {products.map((product) => (
              <option key={product.produto_id} value={product.produto_id}>
                {product.nome_produto}
              </option>
            ))}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl mb={4}>
          <FormLabel>Quantidade</FormLabel>
          <Input
            type="number"
            {...register('qtd_produto_pedido', {
              required: 'Este campo é obrigatório'
            })}
            isInvalid={!!errors.qtd_produto_pedido}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl mb={4}>
          <FormLabel>Valor</FormLabel>
          <Input
            {...register('preco_produto_pedido', {
              required: 'Este campo é obrigatório'
            })}
            isInvalid={!!errors.preco_produto_pedido}
            onInput={FormatFieldMoney}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={3}>
        <Flex justifyContent="flex-end" mt={4}>
          <Button
            colorScheme="orange"
            onClick={handleSubmit(handleAddProduct)}
            rightIcon={<PlusCircleOutlined />}
            size="sm"
          >
            Adicionar no pedido
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ProductSelectGrid;
