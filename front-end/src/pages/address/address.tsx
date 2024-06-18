import Layout from 'components/template/layout';
import { Box, Heading, useToast, useBoolean } from '@chakra-ui/react';
import { endpoints } from 'services/api';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from 'store/auth.context';
import Header from 'components/header/header';
import ConfirmModal from 'components/modal/confirm-delete-modal';
import AddressTable from 'components/address/address-table';
import { IAddress, IAddressRequest } from 'interfaces/address.interface';
import CreateAddressModal from 'components/address/create-address-modal';
import EditAddressModal from 'components/address/update-address-modal';

export default function AddressPage() {
  const [adresses, setAdresses] = useState<IAddress[]>([]);
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();
  const { userState } = useContext(UserAuthContext);
  const [isModalOpen, setIsModalOpen] = useBoolean(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useBoolean(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useBoolean(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

  useEffect(() => {
    setIsLoading.on();
    endpoints.address
      .list()
      .then((result) => {
        setAdresses(result);
      })
      .catch((errors) => {
        console.log('erros', errors);
        toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoading.off();
      });
  }, [setIsLoading, toast, userState.accessToken]);

  const handleDelete = (index: number) => {
    setSelectedAddressIndex(index);
    setIsModalOpen.on();
  };

  const handleCreate = () => {
    setIsCreateModalOpen.on();
  };

  const handleEdit = (address: IAddress) => {
    setSelectedAddress(address);
    setIsEditModalOpen.on();
  };

  const handleCreateAddress = (payload: IAddressRequest) => {
    setIsLoading.on();
    endpoints.address
      .create(payload)
      .then((result) => {
        toast({
          title: 'Success',
          description: 'Endereço criada com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setAdresses([...adresses, result]);
      })
      .catch((errors) => {
        toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoading.off();
        setIsModalOpen.off();
      });
  };

  const handleEditAddress = (payload: IAddressRequest, id: string) => {
    setIsLoading.on();
    endpoints.address
      .update(id, payload)
      .then((result) => {
        toast({
          title: 'Success',
          description: 'Endereço atualizado com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setAdresses((prevAdresses) =>
          prevAdresses.map((address) =>
            address.endereco_id === parseInt(id) ? result : address
          )
        );
      })
      .catch((errors) => {
        toast({
          title: 'Erro',
          description: errors.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      })
      .finally(() => {
        setIsLoading.off();
        setIsEditModalOpen.off();
      });
  };

  const confirmDelete = () => {
    if (selectedAddressIndex !== null) {
      setIsLoading.on();
      endpoints.address
        .delete(selectedAddressIndex)
        .then((result) => {
          toast({
            title: 'Success',
            description: result.message,
            status: 'success',
            duration: 5000,
            isClosable: true
          });

          setAdresses((prevAdresses) =>
            prevAdresses.filter(
              (address) => address.endereco_id !== selectedAddressIndex
            )
          );
        })
        .catch((errors) => {
          toast({
            title: 'Erro',
            description: errors.message,
            status: 'error',
            duration: 5000,
            isClosable: true
          });
        })
        .finally(() => {
          setIsLoading.off();
        });

      setIsModalOpen.off();
    }
  };

  return (
    <Layout>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen.off}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        body="Você tem certeza que deseja excluir este endereço?"
      />
      <CreateAddressModal
        isOpen={isCreateModalOpen}
        onClose={setIsCreateModalOpen.off}
        onCreate={handleCreateAddress}
      />
      <EditAddressModal
        isOpen={isEditModalOpen}
        onClose={setIsEditModalOpen.off}
        onEdit={handleEditAddress}
        address={selectedAddress}
      />
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mx="auto"
        p={3}
        paddingTop={5}
      >
        <Header
          title="Endereços"
          titleButton="Cadastrar"
          onButton={handleCreate}
        />

        <Box p={5}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mx="auto"
            p={4}
          >
            {adresses.length > 0 ? (
              <AddressTable
                adresses={adresses}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ) : (
              <Heading size="sm" color="gray.600">
                Nenhum endereço encontrado.
              </Heading>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
