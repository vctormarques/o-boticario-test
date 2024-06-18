import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { IAddress, IAddressTableProps } from 'interfaces/address.interface';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const AddressTable: React.FC<IAddressTableProps> = ({
  adresses,
  onDelete,
  onEdit
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
          <Th>Editar</Th>
          <Th>Excluir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {adresses.map((add, index) => (
          <Tr key={add.endereco_id}>
            <Td>{index + 1}</Td>
            <Td>{add.cep}</Td>
            <Td>{add.rua}, {add.numero}</Td>
            <Td>{add.bairro}</Td>
            <Td>{add.cidade} / {add.uf}</Td>
            <Td align='center'>
              <IconButton
                variant="outline"
                colorScheme="orange"
                aria-label="Editar endereço"
                size="md"
                icon={<EditIcon />}
                onClick={() => onEdit(add)}
                mr={2}
              />
            </Td>
            <Td align='center'>
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Excluir endereço"
                size="md"
                icon={<DeleteIcon />}
                onClick={() => onDelete(add.endereco_id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AddressTable;
