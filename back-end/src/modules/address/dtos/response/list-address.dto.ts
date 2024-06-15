import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListAddressResponseDto {
    @ApiProperty()
    @IsInt()
    endereco_id: number;

    @ApiProperty()
    @IsString()
    cep: string;

    @ApiProperty()
    @IsString()
    rua: string;

    @ApiProperty()
    @IsString()
    bairro: string;

    @ApiProperty()
    @IsString()
    cidade: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    numero: string;

    @ApiProperty()
    @IsString()
    complemento: string;

    @ApiProperty()
    @IsString()
    uf: string;
}
