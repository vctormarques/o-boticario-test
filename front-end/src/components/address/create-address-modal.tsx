import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import {
  IAddressCreateModalProps,
  IAddressRequest
} from 'interfaces/address.interface';
import axios from 'axios';

const CreateAddressModal: React.FC<IAddressCreateModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const initialAddress: IAddressRequest = {
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    numero: '',
    complemento: '',
    uf: ''
  };

  const [address, setAddress] = useState<IAddressRequest>(initialAddress);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prevAddress: any) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleCreateCategory = () => {
    onCreate(address);
    onClose();
    setAddress(initialAddress);
  };

  const handleSearchCEP = async () => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${address.cep}/json/`
      );
      const data = response.data;
      setAddress({
        cep: data.cep,
        rua: data.logradouro,
        bairro: data.bairro,
        uf: data.uf,
        numero: '',
        complemento: '',
        cidade: data.localidade
      });
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleReset = () => {
    setAddress(initialAddress);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Endereço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>CEP</FormLabel>
            <Input
              name="cep"
              value={address.cep}
              onChange={handleInputChange}
              onBlur={handleSearchCEP}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rua</FormLabel>
            <Input
              name="rua"
              value={address.rua}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bairro</FormLabel>
            <Input
              name="bairro"
              value={address.bairro}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Cidade</FormLabel>
            <Input
              name="cidade"
              value={address.cidade}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Número</FormLabel>
            <Input
              name="numero"
              value={address.numero}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Complemento</FormLabel>
            <Input
              name="complemento"
              value={address.complemento}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>UF</FormLabel>
            <Input name="uf" value={address.uf} onChange={handleInputChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={handleReset}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={handleCreateCategory}>
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateAddressModal;
