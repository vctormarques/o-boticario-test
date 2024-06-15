import React from 'react';
import logoImg from '../../assets/logoHorizontal.jpg';
import { Image, ImageProps } from '@chakra-ui/react';

const LandscapeLogoComponent = (props: ImageProps) => {
  return <Image src={logoImg} alt="Logo da Empresa" {...props} />;  
};

export default LandscapeLogoComponent;
