import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { ProductEntity } from '@modules/product/entities/product.entity';
import { ProductOrderEntity } from '@modules/product-order/entities/product-order.entity';
import { CreateOrderRequestDto } from '../dtos/request/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository.find({
        relations: ['produtosPedido', 'produtosPedido.produto', 'cliente'],
      });
    } catch (error) {
      throw new Error(`Erro ao listar os pedidos: ${error.message}`);
    }
  }

  async findProductsByOrderId(IdOrder: number): Promise<ProductOrderEntity[]> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.produtosPedido', 'produtosPedido')
      .leftJoinAndSelect('produtosPedido.produto', 'produto')
      .leftJoinAndSelect('produto.categoria', 'categoria') 
      .where('order.pedido_id = :IdOrder', { IdOrder })
      .getOne();

    if (!order) {
      throw new NotFoundException(`Pedido com ID ${IdOrder} não encontrado.`);
    }

    const produtos = order.produtosPedido;
    return produtos;
  }

  async create(payload: CreateOrderRequestDto) {
    return payload;
  }
}
