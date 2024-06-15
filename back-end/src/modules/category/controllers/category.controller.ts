import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { DeleteCategoryDto } from '../dtos/delete-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma categoria' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma categoria' })
  delete(@Param() payload: DeleteCategoryDto) {
      return this.categoryService.delete(payload.id);
  }
}
