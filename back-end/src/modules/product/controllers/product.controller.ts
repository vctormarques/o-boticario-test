import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { DeleteCategoryRequestDto } from '@modules/category/dtos/request/delete-category.dto';
import { DeleteProductRequestDto } from '../dtos/request/delete-product.dto';
import { CreateProductRequestDto } from '../dtos/request/create-product.dto';
import { ListProductResponseDto } from '../dtos/response/list-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '@modules/image/image.service';
import { MulterFile } from 'multer';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos',
    type: ListProductResponseDto,
    isArray: true,
  })
  findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagem'))
  @ApiOperation({ summary: 'Cadastrar um produto' })
  @ApiResponse({
    status: 200,
    description: 'Cadastro efetuado',
    type: CreateProductRequestDto
  })
  async create(
    @UploadedFile() file: MulterFile,
    @Body() payload: CreateProductRequestDto
  ) {
    if (file) {
      const fileName = await this.imageService.saveImage(file);
      payload.imagem = fileName;
    }
    return this.productService.create(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um produto' })
  delete(@Param() payload: DeleteProductRequestDto) {
    return this.productService.delete(payload.id);
  }
}
