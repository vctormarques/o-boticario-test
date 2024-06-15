import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
import { CreateAddressRequestDto } from '../dtos/request/create-address.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
    ) {}

    async findAll(): Promise<AddressEntity[]> {
        try {
            return await this.addressRepository.find();
        } catch (error) {
            throw new NotFoundException(`Erro ao listar os endereços: ${error.message}`);
        }  
    }

    async create(payload: CreateAddressRequestDto){
        try {
            return await this.addressRepository.save(payload);
        } catch (error) {
            throw new NotFoundException(`Erro ao criar endereço: ${error.message}`);
        }  
    }


    async delete(id: number) {
        const result = await this.addressRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Endereço com ID ${id} não encontrado`);
        } 
        return { message : 'Deletado com sucesso' }
    }
}
