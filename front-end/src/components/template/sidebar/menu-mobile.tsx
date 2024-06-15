import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Heading,
  VStack
} from '@chakra-ui/react';
import LandscapeLogoComponent from 'components/logo/landscape-logo';
import SidebarMenu from './menu';
import { MenuMobileProps } from 'interfaces/menu-mobile.interface';

const MenuMobile: React.FC<MenuMobileProps> = ({isOpen, onClose}) => {

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="gray.100" color="dark">
        <DrawerCloseButton />
        <DrawerBody>
          <VStack spacing={4} alignItems="flex-start">
            <Heading size="md" justifyContent={'center'}>
              <LandscapeLogoComponent w="220px" borderRadius={10} />
            </Heading>
            <SidebarMenu />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuMobile;
