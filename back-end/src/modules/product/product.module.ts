import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { CategoryModule } from '@modules/category/category.module';
import { ImageService } from '@modules/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), 
  forwardRef(() => CategoryModule),],
  controllers: [ProductController],
  providers: [ProductService, ImageService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
