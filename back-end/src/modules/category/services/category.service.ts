import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryRequestDto } from '../dtos/request/create-category.dto';
import { ProductEntity } from '@modules/product/entities/product.entity';
import { UpdateCategoryRequestDto } from '../dtos/request/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new Error(`Erro ao listar as categorias: ${error.message}`);
    }
  }

  async create(payload: CreateCategoryRequestDto) {
    try {
      return await this.categoryRepository.save(payload);
    } catch (error) {
      throw new Error(`Erro ao criar categoria: ${error.message}`);
    }
  }

  async delete(id: number) {
    const product = await this.productRepository.findOne({
      where: { categoria: { categoria_id: id } },
    });
    if (product) {
      throw new BadRequestException(
        `Não é possível excluir a categoria, porque ela está associado a um ou mais produtos.`
      );
    }

    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    return { message: 'Deletado com sucesso' };
  }

  
  async update(
    id: string,
    payload: UpdateCategoryRequestDto
  ): Promise<CategoryEntity> {
    const address = await this.categoryRepository.findOne({
      where: { categoria_id: parseInt(id) },
    });
    if (!address) {
      throw new NotFoundException(`Categoria com id ${id} não encontrado`);
    }

    Object.assign(address, payload);

    return this.categoryRepository.save(address);
  }
}
