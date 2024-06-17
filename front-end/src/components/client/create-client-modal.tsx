import React, { useEffect, useState } from 'react';
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
  useToast,
  GridItem,
  Grid,
  Toast,
  Select
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import {
  IClientCreateModalProps,
  IClientRequest
} from 'interfaces/client.interface';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AInput from 'components/input/input';
import { IAddress } from 'interfaces/address.interface';
import { endpoints } from 'services/api';
import { FormatFieldCpf, FormatFieldPhone } from 'helpers/formatters';

const CreateClientModal: React.FC<IClientCreateModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IClientRequest>();
  const toast = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const onSubmit = (data: IClientRequest) => {
    onCreate(data);
    onClose();
    reset();
  };

  const [addresses, setAddresses] = useState<IAddress[]>([]);
  useEffect(() => {
    endpoints.address
      .list()
      .then((result) => {
        setAddresses(result);
      })
      .catch((errors) => {
        Toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      });
  }, [toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={2}>
                <FormControl mb={4}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    {...register('nome', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.nome}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    {...register('email', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.email}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...register('username', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.username}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    {...register('senha', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.senha}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    {...register('cpf', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.cpf}
                    onInput={FormatFieldCpf}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    {...register('telefone', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.telefone}
                    onInput={FormatFieldPhone}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Controller
                    name="data_nascimento"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                          handleDateChange(date);
                          field.onChange(date);
                        }}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        dropdownMode="select"
                        customInput={
                          <AInput
                            value={
                              selectedDate
                                ? selectedDate.toLocaleDateString('pt-BR')
                                : ''
                            }
                            onClick={() => {}}
                          />
                        }
                      />
                    )}
                  />
                  {errors.data_nascimento && (
                    <p style={{ color: 'red' }}>
                      {errors.data_nascimento.message}
                    </p>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl mb={4}>
                  <FormLabel>Endereço</FormLabel>
                  <Select
                    {...register('endereco_id', {
                      required: 'Este campo é obrigatório'
                    })}
                    isInvalid={!!errors.endereco_id}
                  >
                    <option value="">Selecione um endereço</option>
                    {addresses.map((address) => (
                      <option
                        key={address.endereco_id}
                        value={address.endereco_id}
                      >
                        {address.rua} / {address.bairro} / {address.cidade}
                      </option>
                    ))}
                  </Select> 
                </FormControl>
              </GridItem>
            </Grid>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateClientModal;
