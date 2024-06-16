import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';

interface AInputProps extends InputProps {
  value: string;
  onClick?: (...args: any[]) => void;
}

const AInput = React.forwardRef<HTMLInputElement, AInputProps>(
  ({ value, onClick, ...rest }, ref) => {
    return (
      <Input
        {...rest}
        value={value}
        width={'255px'}
        onClick={onClick}
        ref={ref}
      />
    );
  }
);

export default AInput;
