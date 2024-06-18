import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAddressRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ID do endereço',
    example: 1,
    required: true,
  })
  endereco_id: number;

  @IsString()
  @MaxLength(9)
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
  @MaxLength(30)
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
  @MaxLength(9)
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
    maxLength: 100,
    example: '',
  })
  complemento: string;

  @IsString()
  @MaxLength(2)
  @ApiProperty({
    description: 'UF',
    maxLength: 2,
    example: 'SP',
  })
  uf: string;
}
