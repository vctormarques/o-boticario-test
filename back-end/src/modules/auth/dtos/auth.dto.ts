import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  IsNumber,
} from 'class-validator';
import { FormatDate } from 'src/helpers/formatters';
import { Transform } from 'class-transformer';

export class AuthRequestDto {
  @IsString()
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
  password: string;
}
