import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryRequestDto } from '../dtos/request/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find();
        } catch (error) {
            throw new Error(`Erro ao listar as categorias: ${error.message}`);
        }  
    }

    async create(payload: CreateCategoryRequestDto){
        try {
            return await this.categoryRepository.save(payload);
        } catch (error) {
            throw new Error(`Erro ao criar categoria: ${error.message}`);
        }  
    }


    async delete(id: number) {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
        } 
        return { message : 'Deletado com sucesso' }
    }
}
