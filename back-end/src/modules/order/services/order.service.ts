import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
  
  @Injectable()
  export class OrderService {
    constructor(
      @InjectRepository(OrderEntity)
      private orderRepository: Repository<OrderEntity>,
    ) {}
  
    async findAll(): Promise<OrderEntity[]> {
      try {
        return await this.orderRepository.find({ relations: ['produtos'] });
      } catch (error) {
        throw new Error(`Erro ao listar as categorias: ${error.message}`);
      }
    }
  
  }
  