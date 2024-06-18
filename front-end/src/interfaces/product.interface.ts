import { ICategory } from "./category.interface";
import { IProductOrder } from "./product-order.interface";

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
  products: IProduct[];
  onDelete: (index: number) => void;
  onEdit: (product: IProduct) => void;

}
export interface IProductOrderTableProps {
  products: IProductOrder[];
}

export interface IProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (product: IProductRequest) => void;
}

export interface IEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (payload: FormData, id: string) => void;
  product: IProduct | null;
}
