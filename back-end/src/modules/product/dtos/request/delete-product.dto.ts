import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class DeleteProductRequestDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Código do produto',
        example: 1,
        required: true,
    })
    id: number;
}
