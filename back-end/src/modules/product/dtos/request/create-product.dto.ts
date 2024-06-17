import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'Nome do produto',
    maxLength: 50,
    example: 'Nome da produto',
    required: true,
  })
  nome_produto: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  @ApiProperty({
    description: 'Descrição da produto',
    maxLength: 200,
    example: 'Descrição da produto',
    required: false,
  })
  descricao_produto: string;

  @IsString()
  @ApiProperty({
    description: 'Preço do produto',
    example: '152.21',
    required: false,
  })
  preco_produto: string;

  @IsString()
  @ApiProperty({
    description: 'Quantidade de estoque',
    example: '15',
    required: false,
  })
  qtd_estoque: string;

  @ApiProperty({
    description: 'Imagem do produto',
    required: false,
    type: 'string',
    format: 'binary',
  })
  imagem: any;

  @IsString()
  @ApiProperty({
    description: 'Código da categoria',
    example: 9,
    required: false,
  })
  categoria_id: string;
}
