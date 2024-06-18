import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductRequestDto } from '../dtos/request/create-product.dto';
import { CategoryEntity } from '@modules/category/entities/category.entity';
import { UpdateProductRequestDto } from '../dtos/request/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.find({ relations: ['categoria'] });
    } catch (error) {
      throw new Error(`Erro ao listar produtos: ${error.message}`);
    }
  }

  async create(payload: CreateProductRequestDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { categoria_id: parseInt(payload.categoria_id) },
      });
      if (!category) {
        throw new NotFoundException(
          `Categoria com ID ${payload.categoria_id} não encontrado`
        );
      }
      let qtd_estoque = parseInt(payload.qtd_estoque);
      let preco_produto = parseFloat(payload.preco_produto);
      const product = this.productRepository.create({
        ...payload,
        qtd_estoque: qtd_estoque,
        preco_produto: preco_produto,
        categoria: category,
      });

      return await this.productRepository.save(product);
    } catch (error) {
      throw new Error(`Erro ao criar produto: ${error.message}`);
    }
  }

  async delete(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return { message: 'Deletado com sucesso' };
  }

  async update(
    id: string,
    payload: UpdateProductRequestDto
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { produto_id: parseInt(id) },
    });
    if (!product) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`);
    }

    let qtd_estoque = parseInt(payload.qtd_estoque);
    let preco_produto = parseFloat(payload.preco_produto);

    Object.assign(product, {
      ...payload,
      qtd_estoque: qtd_estoque,
      preco_produto: preco_produto,
      categoria: payload.categoria_id,
    });

    return this.productRepository.save(product);
  }
}
