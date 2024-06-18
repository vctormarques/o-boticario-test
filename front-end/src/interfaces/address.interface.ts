export interface IAddress {
  endereco_id: number;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  numero: string;
  complemento: string;
  uf: string;
}

export interface IAddressRequest {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  numero: string;
  complemento: string;
  uf: string;
}

export interface IAddressTableProps {
  adresses: IAddress[];
  onDelete: (index: number) => void;
  onEdit: (address: IAddress) => void;
}

export interface IAddressCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (address: IAddressRequest) => void;
}

export interface IAddressEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (payload: IAddressRequest, id: string) => void;
  address: IAddress | null;
}

