import { ListCategoryResponseDto } from '@modules/category/dtos/response/list-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListProductResponseDto {

  product_id: number;

  @ApiProperty()
  @IsString()
  nome_produto: string;

  @ApiProperty()
  @IsString()
  descricao_produto: string;

  @ApiProperty()
  @IsNumber()
  preco_produto: number;

  @ApiProperty()
  @IsInt()
  qtd_estoque: number;

  @ApiProperty()
  data_cadastro_produto: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imagem: string;

  @ApiProperty()
  categoria: ListCategoryResponseDto;

}
