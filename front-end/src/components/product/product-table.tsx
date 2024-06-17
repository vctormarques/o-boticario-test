import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IProductTableProps } from 'interfaces/product.interface';
import { masker } from 'helpers/masker';

const ProductTable: React.FC<IProductTableProps> = ({
  products,
  onDelete
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Nome</Th>
          <Th>Preço</Th>
          <Th>Estoque</Th>
          <Th>Categoria</Th>
          <Th>Excluir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((prod, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{prod.nome_produto}</Td>
            <Td>R$ { masker.money(prod.preco_produto.toString())}</Td>
            <Td>{prod.qtd_estoque}</Td>
            <Td>{prod.categoria.nome_categoria} </Td>
            <Td>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Excluir endereço"
                size="md"
                icon={<DeleteIcon />}
                onClick={() => onDelete(prod.produto_id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductTable;
