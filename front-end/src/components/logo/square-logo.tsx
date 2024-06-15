import React from 'react';
import logoImg from '../../assets/logo.png';
import { Image, ImageProps } from '@chakra-ui/react';


const SquareLogoComponent = (props: ImageProps) => {
  return <Image src={logoImg} alt="Logo da Empresa" {...props} />;
};

export default SquareLogoComponent;
