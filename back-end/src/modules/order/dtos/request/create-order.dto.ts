import { CreateProductOrderRequestDto } from '@modules/product-order/dto/request/create-product-order';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, IsNumber } from 'class-validator';

export class CreateOrderRequestDto {
  @IsInt()
  @ApiProperty({
    description: 'Número do pedido',
    example: 1234,
    required: true,
  })
  numero_pedido: number;

  @IsNumber()
  @ApiProperty({
    description: 'Valor Total do pedido',
    example: 548.71,
    required: true,
  })
  valor_total_pedido: number;

  @IsInt()
  @ApiProperty({
    description: 'Id do cliente',
    example: 1,
    required: true,
  })
  cliente_id: number;

  @IsArray()
  @ApiProperty({
    type: [CreateProductOrderRequestDto],
    description: 'Lista de produtos do pedido',
    required: true,
  })
  produtos: CreateProductOrderRequestDto[];
}
