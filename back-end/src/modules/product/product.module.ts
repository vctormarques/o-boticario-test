import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { CategoryModule } from '@modules/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), 
  forwardRef(() => CategoryModule),],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
