import { CategoryEntity } from '@modules/category/entities/category.entity';
import { ProductOrderEntity } from '@modules/product-order/entities/product-order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'produto' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  produto_id: number;

  @Column({ length: 50, nullable: true })
  nome_produto: string;

  @Column({ length: 200, nullable: true })
  descricao_produto: string;

  @Column({ type: 'numeric', nullable: true })
  preco_produto: number;

  @Column({ nullable: true })
  qtd_estoque: number;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  data_cadastro_produto: Date;

  @Column({ nullable: true })
  imagem: string;

  @ManyToOne(() => CategoryEntity, categoria => categoria.produtos, {
    nullable: false,
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoryEntity;

  @OneToMany(() => ProductOrderEntity, (produtoPedido) => produtoPedido.produto)
  produtos: ProductOrderEntity[];
}

