import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IClientTableProps } from 'interfaces/client.interface';
import { masker } from 'helpers/masker';

const ClientTable: React.FC<IClientTableProps> = ({
  customers,
  onDelete
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>CPF</Th>
          <Th>Telefone</Th>
          <Th>Excluir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {customers.map((cli, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{cli.nome}</Td>
            <Td>{cli.email}</Td>
            <Td>{masker.cpf(cli.cpf)}</Td>
            <Td>{masker.phone(cli.telefone)} </Td>
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
