import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryRequestDto } from '../dtos/request/create-category.dto';
import { DeleteCategoryRequestDto } from '../dtos/request/delete-category.dto';
import { ListCategoryResponseDto } from '../dtos/response/list-category.dto';
import { CreateCategoryResponseDto } from '../dtos/response/create-category.dto';
import { UpdateCategoryRequestDto } from '../dtos/request/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias', type: ListCategoryResponseDto, isArray: true })
  findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma categoria' })
  @ApiResponse({ status: 200, description: 'Cadastro efetuado', type: CreateCategoryResponseDto})
  create(@Body() payload: CreateCategoryRequestDto) {
    return this.categoryService.create(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma categoria' })
  delete(@Param() payload: DeleteCategoryRequestDto) {
      return this.categoryService.delete(payload.id);
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada',
    type: CreateCategoryResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCategoryRequestDto
  ) {
    try {
      return await this.categoryService.update(id, payload);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(`${error.message}`);
    }
  }
}
