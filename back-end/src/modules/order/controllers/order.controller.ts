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
import { ProductEntity } from '@modules/product/entities/product.entity';
import { ProductOrderEntity } from '@modules/product-order/entities/product-order.entity';
import { CreateOrderRequestDto } from '../dtos/request/create-order.dto';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas os pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cliente',
    type: ListOrderResponseDto,
    isArray: true,
  })
  async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':IdOrder/products')
  @ApiOperation({ summary: 'Ver produtos do pedido' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos do pedido',
    type: [ProductOrderEntity],
  })
  async viewProducts(
    @Param('IdOrder') IdOrder: number
  ): Promise<ProductOrderEntity[]> {
    return this.orderService.findProductsByOrderId(IdOrder);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo pedido' })
  async create(@Body() payload: CreateOrderRequestDto) {
    try {
      return await this.orderService.create(payload);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(`${error.message}`);
    }
  }
}
