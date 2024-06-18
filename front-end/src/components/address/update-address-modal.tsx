import React, { useEffect } from 'react';
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
  Input
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
  IAddressEditModalProps,
  IAddressRequest
} from 'interfaces/address.interface';

const EditAddressModal: React.FC<IAddressEditModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  address
}) => {
  const { register, handleSubmit, setValue, reset } =
    useForm<IAddressRequest>();

  useEffect(() => {
    if (address) {
      reset(address);
    }
  }, [address, reset]);

  const onSubmit = (data: IAddressRequest) => {
    if (address) {
      onEdit(data, String(address.endereco_id));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Endereço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>CEP</FormLabel>
              <Input {...register('cep')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rua</FormLabel>
              <Input {...register('rua')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Bairro</FormLabel>
              <Input {...register('bairro')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cidade</FormLabel>
              <Input {...register('cidade')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Número</FormLabel>
              <Input {...register('numero')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Complemento</FormLabel>
              <Input {...register('complemento')} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>UF</FormLabel>
              <Input {...register('uf')} />
            </FormControl>
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green"  type="submit">
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditAddressModal;
