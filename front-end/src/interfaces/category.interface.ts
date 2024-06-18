export interface ICategory {
  categoria_id: number;
  nome_categoria: string;
  descricao_categoria: string;
}
export interface ICategoryRequest {
  nome_categoria: string;
  descricao_categoria: string;
}

export interface ICategoryTableProps {
  categories: ICategory[];
  onDelete: (index: number) => void;
  onEdit: (client: ICategory) => void;

}

export interface ICategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (category: ICategoryRequest) => void;
}