import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class UpdateClientRequestDto {
  
  @IsString()
  @IsOptional()
  @MaxLength(15)
  @ApiProperty({
    description: 'Login do cliente',
    maxLength: 15,
    example: 'vctormarques',
    required: true,
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do cliente',
    example: 'senha123',
    required: true,
  })
  senha: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiProperty({
    description: 'Nome do cliente',
    maxLength: 200,
    example: 'Victor Marques de Paula',
    required: true,
  })
  nome: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @ApiProperty({
    description: 'E-mail do cliente',
    maxLength: 20,
    example: 'victor@gmail.com',
    required: false,
  })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  @ApiProperty({
    description: 'CPF do cliente',
    maxLength: 11,
    example: '12533811102',
    required: false,
  })
  cpf: string;

  @IsString()
  @IsOptional()
  @MaxLength(11)
  @ApiProperty({
    description: 'Telefone do cliente',
    maxLength: 11,
    example: '6499999999',
    required: false,
  })
  telefone: string;

  @IsOptional()
  @ApiProperty({
    description: 'Data de Nascimento do cliente',
    example: '2024-06-01T03:00:00.000Z',
    required: false,
  })
  data_nascimento: Date;

  @IsNumber()
  @ApiProperty({
    description: 'ID do endereço do cliente',
    example: 1,
    required: true,
  })
  endereco_id: number;
  
}
