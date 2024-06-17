import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { DeleteCategoryRequestDto } from '@modules/category/dtos/request/delete-category.dto';
import { DeleteProductRequestDto } from '../dtos/request/delete-product.dto';
import { CreateProductRequestDto } from '../dtos/request/create-product.dto';
import { ListProductResponseDto } from '../dtos/response/list-product.dto';
  
  @ApiTags('Product')
  @Controller('product')
  export class ProductController {
    constructor(private productService: ProductService) {}
  
    @Get()
    @ApiOperation({ summary: 'Listar todos os produtos' })
    @ApiResponse({ status: 200, description: 'Lista de produtos', type: ListProductResponseDto, isArray: true })
    findAll(): Promise<ProductEntity[]> {
      return this.productService.findAll();
    }
  
    @Post()
    @ApiOperation({ summary: 'Cadastrar um produto' })
    @ApiResponse({ status: 200, description: 'Cadastro efetuado', type: CreateProductRequestDto, isArray: true })
    create(@Body() payload: CreateProductRequestDto) {
      return this.productService.create(payload);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Excluir um produto' })
    delete(@Param() payload: DeleteProductRequestDto) {
        return this.productService.delete(payload.id);
    }
  }
  