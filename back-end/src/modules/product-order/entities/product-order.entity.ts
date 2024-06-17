import { OrderEntity } from '@modules/order/entities/order.entity';
import { ProductEntity } from '@modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'produto_pedido' })
export class ProductOrderEntity {
  @PrimaryGeneratedColumn()
  produto_pedido_id: number;

  @Column({ type: 'int', nullable: true })
  qtd_produto_pedido: number;

  @Column({ type: 'decimal', nullable: true })
  preco_produto_pedido: number;

  @Column({ type: 'int', nullable: true })
  produto_id: number;

  @Column({ type: 'int', nullable: true })
  pedido_id: number;

  @ManyToOne(() => ProductEntity, produto => produto.produtosPedido)
  @JoinColumn({ name: 'produto_id' })
  produto: ProductEntity;

  @ManyToOne(() => OrderEntity, (pedido) => pedido.produtosPedido)
  @JoinColumn({ name: 'pedido_id' })
  pedido: OrderEntity;

}


