import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber} from 'class-validator';

export class DeleteClientRequestDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Código do cliente',
        example: 1,
        required: true,
    })
    id: number;
}
