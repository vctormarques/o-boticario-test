import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IClientTableProps } from 'interfaces/client.interface';

const ClientTable: React.FC<IClientTableProps> = ({
  customers,
  onDelete
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>CEP</Th>
          <Th>Rua</Th>
          <Th>Bairro</Th>
          <Th>Cidade/UF</Th>
          <Th>Excluir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {customers.map((cli, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{cli.nome}</Td>
            <Td>{cli.email}</Td>
            <Td>{cli.cpf}</Td>
            <Td>{cli.telefone} </Td>
            <Td>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Excluir endereço"
                size="md"
                icon={<DeleteIcon />}
                onClick={() => onDelete(cli.cliente_id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ClientTable;
