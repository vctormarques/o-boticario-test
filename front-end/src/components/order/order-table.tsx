import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IOrderTableProps } from 'interfaces/order.interface';
import { masker } from 'helpers/masker';
import { IProduct } from 'interfaces/product.interface';
import { IProductOrder } from 'interfaces/product-order.interface';
import { IoIosFolderOpen } from 'react-icons/io';

const OrderTable: React.FC<IOrderTableProps> = ({ orders, onView }) => {
  const getTotalProductCount = (produtos: IProductOrder[]): number => {
    return produtos.reduce((sum, produto) => sum + produto.qtd_produto_pedido, 0);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Nº Pedido</Th>
          <Th>Cliente</Th>
          <Th>Data do Pedido</Th>
          <Th>Qtd de Prod.</Th>
          <Th>Total do pedido</Th>
          <Th>Ver produtos</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{order.numero_pedido}</Td>
            <Td>{order.cliente.nome}</Td>
            <Td>{new Date(order.data_pedido).toLocaleDateString()}</Td>
            <Td>{getTotalProductCount(order.produtosPedido)}</Td>
            <Td>R$ {masker.money(order.valor_total_pedido.toString())}</Td>
            <Td>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Ver produtos"
                size="md"
                icon={<IoIosFolderOpen />}
                onClick={() => onView(order.pedido_id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrderTable;
