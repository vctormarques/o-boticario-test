import { IAddress } from "./address.interface";

export interface IClient {
  cliente_id: number;
  email: string;
  username: string;
  senha: string;
  nome: string;
  cpf: string;
  telefone: string;
  data_nascimento: Date;
  endereco_id: number;
  endereco?: IAddress;
}

export interface IClientRequest {
  email: string;
  username: string;
  senha: string;
  nome: string;
  cpf: string;
  telefone: string;
  data_nascimento: Date;
  endereco_id: number;
}

export interface IClientTableProps {
  customers: IClient[];
  onDelete: (index: number) => void;
  onEdit: (client: IClient) => void;
}

export interface IClientCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (client: IClientRequest) => void;
}

export interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (payload: IClientRequest, id: string) => void;
  client: IClient | null;
}
