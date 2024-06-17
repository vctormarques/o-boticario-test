import { ListCategoryResponseDto } from '@modules/category/dtos/response/list-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListProductResponseDto {
  @ApiProperty({
    description: 'Id do produto',
    example: 1,
  })
  product_id: number;

  @ApiProperty({
    description: 'Nome do produto',
    example: 'ZAAD',
  })
  @IsString()
  nome_produto: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Eau de Parfum',
  })
  @IsString()
  descricao_produto: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 299.90,
  })
  @IsNumber()
  preco_produto: number;

  @ApiProperty({
    description: 'Estoque do produto',
    example: 1241,
  })
  @IsInt()
  qtd_estoque: number;

  @ApiProperty({
    description: 'Data do cadastro do produto',
    example: '2024-06-2024',
  })
  data_cadastro_produto: Date;

  @ApiProperty({
    description: 'Imagem do produto',
    example: 'foto-zaad.jpg',
  })
  @IsString()
  @IsOptional()
  imagem: string;

  @ApiProperty({
    description: 'Categoria do produto',
    type: ListCategoryResponseDto,
  })
  categoria: ListCategoryResponseDto;

}
