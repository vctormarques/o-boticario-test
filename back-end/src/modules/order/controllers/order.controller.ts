import {
  BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { ListOrderResponseDto } from '../dtos/response/list-order.dto';
  
  @ApiTags('Orders')
  @Controller('Order')
  export class OrderController {
    constructor(private orderService: OrderService) {}
  
    @Get()
    @ApiOperation({ summary: 'Listar todas os pedidos' })
    @ApiResponse({ status: 200, description: 'Lista de cliente', type: ListOrderResponseDto, isArray: true })
    findAll(): Promise<OrderEntity[]> {
      return this.orderService.findAll();
    }
  
  }
  