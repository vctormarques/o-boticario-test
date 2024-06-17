import { OrderEntity } from '@modules/order/entities/order.entity';
import { ProductEntity } from '@modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'produto_pedido' })
export class ProductOrderEntity {
  @PrimaryGeneratedColumn()
  produto_pedido_id: number;

  @Column({ type: 'int', nullable: true })
  qtd_produto_pedido: number;

  @Column({ type: 'decimal', nullable: true })
  preco_produto_pedido: number;

  @ManyToOne(() => ProductEntity, (produto) => produto.produtos)
  @JoinColumn({ name: 'produto_id' })
  produto: ProductEntity;

  @ManyToOne(() => OrderEntity, (pedido) => pedido.produtos)
  @JoinColumn({ name: 'pedido_id' })
  pedido: OrderEntity;
}
