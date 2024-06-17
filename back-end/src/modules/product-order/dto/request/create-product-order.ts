import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateProductOrderRequestDto {
  
  @IsInt()
  @ApiProperty({
    description: 'Id do Produto',
    example: 1,
    required: true,
  })
  produto_id: number;

  @IsInt()
  @ApiProperty({
    description: 'Quantidade do Produto',
    example: 12,
    required: true,
  })
  qtd_produto_pedido: number;

  @IsNumber()
  @ApiProperty({
    description: 'Preço do produto do pedido',
    example: 15.90,
    required: true,
  })
  preco_produto_pedido: string;
  
}
