import { Controller, Get } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
}
