import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListAddressResponseDto {
  @ApiProperty({
    description: 'ID do endereço',
    example: 1,
  })
  @IsInt()
  endereco_id: number;

  @ApiProperty({
    description: 'CEP do endereço',
    example: '75530390',
  })
  @IsString()
  cep: string;

  @ApiProperty({
    description: 'Rua do endereço',
    example: 'Getulio Vargas',
  })
  @IsString()
  rua: string;

  @ApiProperty({
    description: 'Bairro do endereço',
    example: 'Centro',
  })
  @IsString()
  bairro: string;

  @ApiProperty({
    description: 'Cidade do endereço',
    example: 'Itumbiara',
  })
  @IsString()
  cidade: string;

  @ApiProperty({
    description: 'Número do endereço',
    example: '154',
  })
  @IsString()
  @IsOptional()
  numero: string;

  @ApiProperty({
    description: 'Complemento do endereço',
    example: '',
  })
  @IsString()
  complemento: string;

  @ApiProperty({
    description: 'UF do endereço',
    example: 'GO',
  })
  @IsString()
  uf: string;
}
