import { IClient } from "./client.interface";
import { IProductOrder, IProductOrderRequest } from "./product-order.interface";

export interface IOrder {
  pedido_id: number;
  numero_pedido: number;
  valor_total_pedido: number;
  data_pedido: Date;
  status: boolean;
  cliente: IClient;
  produtosPedido: IProductOrder[];
}

export interface IOrderRequest {
  numero_pedido: number;
  valor_total_pedido: number;
  cliente_id: number;
  produtos: IProductOrderRequest[];
}

export interface IOrderTableProps {
  orders: IOrder[];
  onView: (index: number) => void;
}

export interface IOrderCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (order: IOrderRequest) => void;
}
