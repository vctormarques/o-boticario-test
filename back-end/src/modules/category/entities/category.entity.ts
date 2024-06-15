import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'categoria' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  categoria_id: number;

  @Column({ length: 20, nullable: true })
  nome_categoria: string;

  @Column({ length: 200, nullable: true })
  descricao_categoria: string;
}
