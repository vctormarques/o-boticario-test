import { IsString, IsOptional, IsDateString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateClientResponseDto {
  @IsInt()
  cliente_id: number;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  senha: string;

  @IsString()
  @IsOptional()
  nome: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsDateString()
  @IsOptional()
  data_nascimento?: Date;

  @IsNotEmpty()
  endereco_id: number;
}
