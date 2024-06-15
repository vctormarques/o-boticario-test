import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber} from 'class-validator';

export class DeleteAddressRequestDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Código do endereço',
        example: 1,
        required: true,
    })
    id: number;
}
