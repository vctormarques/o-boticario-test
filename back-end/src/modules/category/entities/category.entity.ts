import { ProductEntity } from '@modules/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'categoria' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  categoria_id: number;

  @Column({ length: 20, nullable: true })
  nome_categoria: string;

  @Column({ length: 200, nullable: true })
  descricao_categoria: string;

  @OneToMany(() => ProductEntity, produto => produto.categoria)
  produtos: ProductEntity[];
}
