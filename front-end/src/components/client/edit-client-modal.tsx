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
  Select
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { IClientRequest, IClient } from 'interfaces/client.interface';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AInput from 'components/input/input';
import { IAddress } from 'interfaces/address.interface';
import { endpoints } from 'services/api';
import { FormatFieldCpf, FormatFieldPhone } from 'helpers/formatters';

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (payload: IClientRequest, id: string) => void;
  client: IClient | null;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  client
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue
  } = useForm<IClientRequest>();
  const toast = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (client) {
      reset({
        username: client.username,
        senha: '', 
        nome: client.nome,
        email: client.email,
        cpf: client.cpf,
        telefone: client.telefone,
        data_nascimento: new Date(client.data_nascimento),
        endereco_id: client.endereco?.endereco_id
      });
      setSelectedDate(new Date(client.data_nascimento));
    }
  }, [client, reset, setValue]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const onSubmit = (data: IClientRequest) => {
    if (client?.cliente_id !== undefined) {
      onEdit(data, client.cliente_id.toString());
    }
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
        toast({
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
        <ModalHeader>Editar Cliente</ModalHeader>
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
                  <Input {...register('email')} isInvalid={!!errors.email} />
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
                  <Input {...register('senha')} isInvalid={!!errors.senha} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    {...register('cpf')}
                    isInvalid={!!errors.cpf}
                    onInput={FormatFieldCpf}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl mb={4}>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    {...register('telefone')}
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
                        value={address.endereco_id.toString()}
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
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClientModal;
