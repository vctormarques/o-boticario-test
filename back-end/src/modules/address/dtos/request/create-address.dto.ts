import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAddressRequestDto {
    @IsString()
    @MaxLength(20)
    @ApiProperty({
        description: 'CEP',
        maxLength: 9,
        example: '01100000',
    })
    cep: string;

    @IsString()
    @MaxLength(100)
    @ApiProperty({
        description: 'Rua',
        maxLength: 100,
        example: 'Rua Joao da Cruz',
    })
    rua: string;

    @IsString()
    @MaxLength(20)
    @ApiProperty({
        description: 'Bairro',
        maxLength: 30,
        example: 'Ponte Pequena',
    })
    bairro: string;

    @IsString()
    @MaxLength(30)
    @ApiProperty({
        description: 'Cidade',
        maxLength: 30,
        example: 'São Paulo',
    })
    cidade: string;

    @IsString()
    @MaxLength(10)
    @ApiProperty({
        description: 'Número',
        maxLength: 9,
        example: '1326',
    })
    numero: string;

    @IsString()
    @MaxLength(100)
    @ApiProperty({
        description: 'Complemento',
        maxLength: 9,
        example: '',
    })
    complemento: string;

    @IsString()
    @MaxLength(2)
    @ApiProperty({
        description: 'UF',
        maxLength: 9,
        example: 'SP',
    })
    uf: string;

}
