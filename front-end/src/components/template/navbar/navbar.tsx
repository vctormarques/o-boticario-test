import React, { useEffect, useState } from 'react';
import {
  Button,
  Heading,
  Flex,
  IconButton,
  Spacer,
  HStack,
  Text
} from '@chakra-ui/react';
import { IoIosLogOut } from 'react-icons/io';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

interface NavbarProps {
  onOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpen }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signout(() => navigate('/login'));
  };
  
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'America/Sao_Paulo',
    });
  };

  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex p={4} bg="gray.200" alignItems="center">
      <IconButton
        icon={<HamburgerIcon />}
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
        aria-label="Open Sidebar"
        variant="outline"
        mr={2}
      />
      <Heading size="sm" color="#a1b970">
        {auth.userState.user.nome}
        <Text fontSize={'0.8rem'} color="#777" mt={'0.2rem'}>
          Hora Atual: {currentTime}
        </Text>
      </Heading>
      <Spacer />
      <HStack spacing={4} alignItems="center">
        <Button
          variant="ghost"
          color="gray.800"
          rightIcon={<IoIosLogOut />}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
