import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import MenuMobile from 'components/template/sidebar/menu-mobile';
import Sidebar from 'components/template/sidebar/sidebar';
import Navbar from 'components/template/navbar/navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <Sidebar />
      <MenuMobile isOpen={isOpen} onClose={onClose} />
      <Box ml={{ base: 0, md: '250px' }} p={4} flex="1">
        <Navbar onOpen={onOpen} />

        <Box mt={10}>{children}</Box>
      </Box>
    </Flex>
  );
};

export default Layout;
