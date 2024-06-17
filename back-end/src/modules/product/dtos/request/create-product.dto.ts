import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

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

    @IsNumber()
    @ApiProperty({
        description: 'Preço do produto',
        example: '152.21',
        required: false,
    })
    preco_produto: number;

    @IsInt()
    @ApiProperty({
        description: 'Quantidade de estoque',
        example: '15',
        required: false,
    })
    qtd_estoque: number;

    @IsString()
    @ApiProperty({
        description: 'Nome da imagem',
        required: false,
    })
    imagem: string;

    @IsInt()
    @ApiProperty({
        description: 'Código da categoria',
        example: '9',
        required: false,
    })
    categoria_id: number;

}
