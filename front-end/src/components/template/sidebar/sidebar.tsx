import React from 'react';
import {
  VStack,
  Heading,
  Box
} from '@chakra-ui/react';
import LandscapeLogoComponent from 'components/logo/landscape-logo';
import SidebarMenu from './menu';

const Sidebar: React.FC = () => {
  return (
    <Box
      as="nav"
      pos="fixed"
      left={0}
      top={0}
      h="100vh"
      w="250px"
      bg="gray.200"
      color="gray.800"
      p={4}
      boxShadow="lg"
      display={{ base: 'none', md: 'block' }}
    >
      <VStack spacing={4} alignItems="flex-start">
        <Heading size="md" justifyContent={'center'}>
          <LandscapeLogoComponent w="220px" borderRadius={10} />
        </Heading>
        <SidebarMenu />
      </VStack>
    </Box>
  );
};

export default Sidebar;
