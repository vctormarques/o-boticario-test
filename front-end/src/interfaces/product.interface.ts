import { ICategory } from "./category.interface";

export interface IProduct {
  produto_id: number;
  nome_produto: string;
  descricao_produto: string;
  preco_produto: number;
  qtd_estoque: number;
  imagem: File;
  categoria_id: number;
  categoria: ICategory;
}

export interface IProductRequest {
  nome_produto: string;
  descricao_produto: string;
  preco_produto: number;
  qtd_estoque: number;
  imagem: File | null;
  categoria_id: number;
}

export interface IProductTableProps {
  customers: IProduct[];
  onDelete: (index: number) => void;
}

export interface IProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (product: IProductRequest) => void;
}