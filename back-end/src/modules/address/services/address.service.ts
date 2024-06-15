import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
import { CreateAddressRequestDto } from '../dtos/request/create-address.dto';
import { ClientEntity } from '@modules/client/entities/client.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>
  ) {}

  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.addressRepository.find();
    } catch (error) {
      throw new NotFoundException(
        `Erro ao listar os endereços: ${error.message}`
      );
    }
  }

  async create(payload: CreateAddressRequestDto) {
    try {
      return await this.addressRepository.save(payload);
    } catch (error) {
      throw new NotFoundException(`Erro ao criar endereço: ${error.message}`);
    }
  }

  async delete(id: number) {
    const client = await this.clientRepository.findOne({
      where: { endereco: { endereco_id: id } },
    });

    const result = await this.addressRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
    }

    if (client) {
      throw new BadRequestException(
        `Não é possível excluir o endereço, porque ele está associado a um ou mais clientes.`
      );
    }

    return { message: 'Deletado com sucesso' };
  }
}
