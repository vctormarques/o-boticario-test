import React from 'react';
import { VStack, Button } from '@chakra-ui/react';
import { IoMdClipboard } from 'react-icons/io';
import { PlusSquareIcon } from '@chakra-ui/icons';

const SidebarMenu: React.FC = () => {
  return (
    <VStack spacing={4} alignItems="flex-start" mt={4} ml={3}>
      <Button
        variant="link"
        color="gray.700"
        leftIcon={<IoMdClipboard />}
        fontSize={18}
      >
        Pedido
      </Button>
      <Button
        variant="link"
        color="gray.700"
        leftIcon={<PlusSquareIcon />}
        fontSize={18}
      >
        Produtos
      </Button>
      <Button
        variant="link"
        color="gray.700"
        leftIcon={<PlusSquareIcon />}
        fontSize={18}
      >
        Categoria
      </Button>
      <Button
        variant="link"
        color="gray.700"
        leftIcon={<PlusSquareIcon />}
        fontSize={18}
      >
        Cliente
      </Button>
    </VStack>
  );
};

export default SidebarMenu;
