import Layout from 'components/template/layout';
import { Box, Heading, useToast, useBoolean } from '@chakra-ui/react';
import { endpoints } from 'services/api';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from 'store/auth.context';
import Header from 'components/header/header';
import ConfirmModal from 'components/modal/confirm-delete-modal';
import { IClient, IClientRequest } from 'interfaces/client.interface';
import ClientTable from 'components/client/client-table';
import CreateClientModal from 'components/client/create-client-modal';
import { masker } from 'helpers/masker';
import EditClientModal from 'components/client/edit-client-modal';

export default function ClientPage() {
  const [customers, setCustomers] = useState<IClient[]>([]);
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();
  const { userState } = useContext(UserAuthContext);
  const [isModalOpen, setIsModalOpen] = useBoolean(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useBoolean(false);
  const [selectedClientIndex, setSelectedClientIndex] = useState<number | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useBoolean(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);

  useEffect(() => {
    setIsLoading.on();
    endpoints.client
      .list()
      .then((result) => {
        setCustomers(result);
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
    setSelectedClientIndex(index);
    setIsModalOpen.on();
  };

  const handleCreate = () => {
    setIsCreateModalOpen.on();
  };

  const handleEdit = (client: IClient) => {
    setSelectedClient(client);
    setIsEditModalOpen.on();
  };

  const handleCreateClient = (payload: IClientRequest) => {
    payload.endereco_id = Number(payload.endereco_id);
    payload.cpf = masker.removeMaskFromCPF(payload.cpf);
    payload.telefone = masker.removeMaskFromCPF(payload.telefone);
    setIsLoading.on();
    endpoints.client
      .create(payload)
      .then((result) => {
        toast({
          title: 'Success',
          description: 'Cliente criado com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setCustomers([...customers, result]);
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

  const handleEditClient = (payload: IClientRequest, id: string) => {
    payload.endereco_id = Number(payload.endereco_id);
    payload.cpf = masker.removeMaskFromCPF(payload.cpf);
    payload.telefone = masker.removeMaskFromCPF(payload.telefone);
    setIsLoading.on();
    endpoints.client
      .update(id, payload)
      .then((result) => {
        toast({
          title: 'Success',
          description: 'Cliente atualizado com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setCustomers((prevCustomers) =>
          prevCustomers.map((client) =>
            client.cliente_id === parseInt(id) ? result : client
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
    if (selectedClientIndex !== null) {
      setIsLoading.on();
      endpoints.client
        .delete(selectedClientIndex)
        .then((result) => {
          toast({
            title: 'Success',
            description: result.message,
            status: 'success',
            duration: 5000,
            isClosable: true
          });

          setCustomers((prevCustomers) =>
            prevCustomers.filter(
              (client) => client.cliente_id !== selectedClientIndex
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
        body="Você tem certeza que deseja excluir este cliente?"
      />
      <CreateClientModal
        isOpen={isCreateModalOpen}
        onClose={setIsCreateModalOpen.off}
        onCreate={handleCreateClient}
      />
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={setIsEditModalOpen.off}
        onEdit={handleEditClient}
        client={selectedClient}
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
          title="Clientes"
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
            {customers.length > 0 ? (
              <ClientTable
                customers={customers}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ) : (
              <Heading size="sm" color="gray.600">
                Nenhum cliente encontrado.
              </Heading>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
