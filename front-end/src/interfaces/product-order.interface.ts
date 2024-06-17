import { IProduct } from './product.interface';

export interface IProductOrder {
  produto_pedido_id: number;
  qtd_produto_pedido: number;
  preco_produto_pedido: number;
  produto_id: Date;
  pedido_id: number;
  status: boolean;
  produto: IProduct;
}

export interface IProductOrderRequest {
  produto_id: number;
  qtd_produto_pedido: number;
  preco_produto_pedido: number;
  pedido_id: number;
}
