import { ListClientDto } from '@modules/client/dtos/response/list-client.dto';
import { ListProductResponseDto } from '@modules/product/dtos/response/list-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNumber, IsOptional } from 'class-validator';

export class ListOrderResponseDto {
  @ApiProperty({
    description: 'ID do pedido',
    example: 1,
  })
  @IsInt()
  pedido_id: number;

  @ApiProperty({
    description: 'Número do pedido',
    example: 12345,
  })
  @IsInt()
  numero_pedido: number;

  @ApiProperty({
    description: 'Valor total do pedido',
    example: 199.99,
  })
  @IsNumber()
  valor_total_pedido: number;

  @ApiProperty({
    description: 'Data do pedido',
    example: '2024-06-17',
  })
  @IsDate()
  data_pedido: Date;

  @ApiProperty({
    description: 'Status do pedido',
    example: true,
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    description: 'Cliente do pedido',
    type: ListClientDto,
  })
  cliente: ListClientDto;

  @ApiProperty({
    description: 'Produtos do pedido',
    type: [ListProductResponseDto],
  })
  produtos: ListProductResponseDto[];
}
