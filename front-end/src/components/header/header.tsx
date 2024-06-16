import React from 'react';
import { Button, Flex, Heading, VStack } from '@chakra-ui/react';

interface HeaderProps {
  title: string;
  titleButton: string;
  onButton: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, titleButton, onButton }) => {
  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Heading size="md" color="#00a470" ml="6">
        {title}
      </Heading>
      <Button colorScheme="green" mr="6" onClick={() => onButton()}>
        {titleButton}
      </Button>
    </Flex>
  );
};

export default Header;
