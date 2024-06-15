import { ListAddressResponseDto } from '@modules/address/dtos/response/list-address.dto';
import { AddressEntity } from '@modules/address/entities/address.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class ListClientDto {
  cliente_id: number;
  @ApiProperty()
  @IsInt()
  email: string;

  @ApiProperty()
  @IsInt()
  username: string;

  @ApiProperty()
  @IsInt()
  senha: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  nome: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  cpf: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  telefone?: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  data_nascimento?: Date;

  @ApiProperty()
  @IsInt()
  endereco: ListAddressResponseDto;

}
