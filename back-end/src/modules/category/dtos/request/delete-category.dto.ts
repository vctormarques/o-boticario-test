import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber} from 'class-validator';

export class DeleteCategoryRequestDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Código da categoria',
        example: 1,
        required: true,
    })
    id: number;
}
