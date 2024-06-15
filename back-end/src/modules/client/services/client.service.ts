import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';
import { CreateClientRequestDto } from '../dtos/request/create-client.dto';
import { AddressEntity } from '@modules/address/entities/address.entity';
import { PasswordService } from './password.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly passwordService: PasswordService
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    try {
      return await this.clientRepository.find({ relations: ['endereco'] });
    } catch (error) {
      throw new Error(`Erro ao listar os clientes: ${error.message}`);
    }
  }

  async create(payload: CreateClientRequestDto){
    try {
      const address = await this.addressRepository.findOne({ where: { endereco_id: payload.endereco_id } });
      if (!address) {
        throw new NotFoundException(`Endereço com ID ${payload.endereco_id} não encontrado`);
      }

      const client = this.clientRepository.create({
        ...payload,
        endereco: address,
      });

      return await this.clientRepository.save(client);
    } catch (error) {
      throw new Error(`Erro ao criar cliente: ${error.message}`);
    }
  }
  

  async delete(id: number) {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return { message : 'Deletado com sucesso' }
  }

  async validateClientCredentials(username: string): Promise<ClientEntity | null> {
    const client = await this.clientRepository.findOne({where: { username }});
    if (!client) {
      return null;
    }
    return client;
  }
}
