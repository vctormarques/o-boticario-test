import { AddressEntity } from '@modules/address/entities/address.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'cliente' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  cliente_id: number;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ length: 15, nullable: true })
  username: string;

  @Column({ length: 20, nullable: true })
  senha: string;

  @Column({ length: 200, nullable: true })
  nome: string;

  @Column({ length: 11, nullable: true })
  cpf: string;

  @Column({ length: 11, nullable: true })
  telefone: string;

  @Column({nullable: true })
  data_nascimento: Date;

  @ManyToOne(() => AddressEntity, endereco => endereco.clientes, { nullable: true })
  @JoinColumn({ name: 'endereco_id' })
  endereco: AddressEntity;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.senha) {
      this.senha = await bcrypt.hash(this.senha, 10);
    }
  }

  toJSON() {
    const { senha, ...rest } = this;
    return rest;
  }

}
