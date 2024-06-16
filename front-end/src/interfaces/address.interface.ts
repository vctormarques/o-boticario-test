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
}

export interface IAddressCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (address: IAddressRequest) => void;
}
