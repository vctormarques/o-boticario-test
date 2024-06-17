import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { IProductOrderTableProps } from 'interfaces/product.interface';
import { masker } from 'helpers/masker';

const ProductOrderTable: React.FC<IProductOrderTableProps> = ({
  products
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Nome</Th>
          <Th>Qtd</Th>
          <Th>Preço</Th>
          <Th>Categoria</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((prod, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{prod.produto.nome_produto}</Td>
            <Td>{prod.qtd_produto_pedido}</Td>
            <Td>R$ { masker.money(prod.preco_produto_pedido.toString())}</Td>
            <Td>{prod.produto.categoria.nome_categoria} </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductOrderTable;
