import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ListCategoryResponseDto {
  @ApiProperty({
    description: 'Id da categoria',
    example: 1,
  })
  @IsInt()
  categoria_id: number;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Parfurm',
  })
  @IsString()
  nome_categoria: string;

  @ApiProperty({
    description: 'Descrição da categoria',
    example: 'Eau de Parfurm',
  })
  @IsString()
  descricao_categoria: string;
}
