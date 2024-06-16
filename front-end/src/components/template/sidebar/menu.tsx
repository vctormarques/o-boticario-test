import React from 'react';
import { VStack } from '@chakra-ui/react';
import { IoMdClipboard } from 'react-icons/io';
import { PlusSquareIcon } from '@chakra-ui/icons';
import NavLinkButton from './nav-link-menu';

const SidebarMenu: React.FC = () => {
  return (
    <VStack spacing={4} alignItems="flex-start" mt={4} ml={3}>
      <VStack spacing={4} alignItems="flex-start" mt={4} ml={3}>
        <NavLinkButton to="/pedido" icon={IoMdClipboard}>
          Pedido
        </NavLinkButton>
        <NavLinkButton to="/produtos" icon={PlusSquareIcon}>
          Produtos
        </NavLinkButton>
        <NavLinkButton to="/category" icon={PlusSquareIcon}>
          Categoria
        </NavLinkButton>
        <NavLinkButton to="/client" icon={PlusSquareIcon}>
          Cliente
        </NavLinkButton>
        <NavLinkButton to="/address" icon={PlusSquareIcon}>
          Endereço
        </NavLinkButton>
      </VStack>
    </VStack>
  );
};

export default SidebarMenu;
