import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IAddressTableProps } from 'interfaces/address.interface';

const AddressTable: React.FC<IAddressTableProps> = ({
  adresses,
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
        {adresses.map((add, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{add.cep}</Td>
            <Td>{add.rua}, {add.numero}</Td>
            <Td>{add.bairro}</Td>
            <Td>{add.cidade} / {add.uf}</Td>
            <Td>
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
