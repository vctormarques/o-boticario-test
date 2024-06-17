import { ClientEntity } from '@modules/client/entities/client.entity';
import { ProductOrderEntity } from '@modules/product-order/entities/product-order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'pedido' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  pedido_id: number;

  @Column({ nullable: true })
  numero_pedido: number;

  @Column({ nullable: true, type: 'numeric' })
  valor_total_pedido: number;

  @Column({ nullable: true, default: () => 'now()' })
  data_pedido: Date;

  @Column({ nullable: true })
  status: boolean;

  @ManyToOne(() => ClientEntity, cliente => cliente.pedidos)
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClientEntity;

  @OneToMany(() => ProductOrderEntity, produtoPedido => produtoPedido.pedido, { cascade: true })
  produtosPedido: ProductOrderEntity[]; 

  @OneToMany(() => ProductOrderEntity, produtoPedido => produtoPedido.pedido, { cascade: true })
  pedidos: ProductOrderEntity[]; 

}
