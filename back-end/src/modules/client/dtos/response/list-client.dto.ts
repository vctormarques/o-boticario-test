import { ListAddressResponseDto } from '@modules/address/dtos/response/list-address.dto';
import { AddressEntity } from '@modules/address/entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class ListClientDto {
  @ApiProperty({
    description: 'ID do cliente',
    example: 1,
  })
  cliente_id: number;

  @ApiProperty({
    description: 'E-mail do cliente',
    example: 'teste@gmail.com',
  })
  @IsInt()
  email: string;

  @ApiProperty({
    description: 'Username do cliente',
    example: 'teste',
  })
  @IsInt()
  username: string;

  @ApiProperty({
    description: 'Senha do cliente',
  })
  @IsInt()
  senha: string;

  @ApiProperty({
    description: 'Senha do cliente',
    example: 'Teste Oliveira',
  })
  @IsInt()
  @IsOptional()
  nome: string;

  @ApiProperty({
    description: 'CPF do cliente',
    example: '123.123.123-12',
  })
  @IsInt()
  @IsOptional()
  cpf: string;

  @ApiProperty({
    description: 'CPF do cliente',
    example: '123.123.123-12',
  })
  @IsInt()
  @IsOptional()
  telefone?: string;

  @ApiProperty({
    description: 'Data de Nascimento do cliente',
    example: '2024-06-17T10:45:52.659Z',
  })
  @IsDate()
  @IsOptional()
  data_nascimento?: Date;

  @ApiProperty({
    description: 'Endereço do cliente',
    type: ListAddressResponseDto,
  })
  @IsInt()
  endereco: ListAddressResponseDto;

}
