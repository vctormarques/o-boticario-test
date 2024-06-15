import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCategoryResponseDto {
    @ApiProperty()
    @IsInt()
    categoria_id: number;

    @ApiProperty()
    @IsString()
    nome_categoria: string;

    @ApiProperty()
    @IsString()
    descricao_categoria: string;
}
