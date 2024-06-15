import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @ApiProperty({
        description: 'Nome da categoria',
        maxLength: 20,
        example: 'Nome da categoria',
        required: true,
    })
    nome_categoria: string;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    @ApiProperty({
        description: 'Descrição da categoria',
        maxLength: 200,
        example: 'Descrição da categoria',
        required: false,
    })
    descricao_categoria: string;
}
