import { ClientEntity } from '@modules/client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'endereco' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  endereco_id: number;

  @Column({ length: 9, nullable: true })
  cep: string;

  @Column({ length: 100, nullable: true })
  rua: string;

  @Column({ length: 30, nullable: true })
  bairro: string;

  @Column({ length: 30, nullable: true })
  cidade: string;

  @Column({ length: 10, nullable: true })
  numero: string;

  @Column({ length: 100, nullable: true })
  complemento: string;

  @Column({ length: 2, nullable: true })
  uf: string;

  @OneToMany(() => ClientEntity, client => client.endereco)
  clientes: ClientEntity[];
}
