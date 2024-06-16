import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { ICategoryTableProps } from 'interfaces/category.interface';

const CategoryTable: React.FC<ICategoryTableProps> = ({
  categories,
  onDelete
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Nome</Th>
          <Th>Descrição</Th>
          <Th>Excluir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {categories.map((cat, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{cat.nome_categoria}</Td>
            <Td>{cat.descricao_categoria}</Td>
            <Td>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Excluir categoria"
                size="md"
                icon={<DeleteIcon />}
                onClick={() => onDelete(cat.categoria_id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CategoryTable;
