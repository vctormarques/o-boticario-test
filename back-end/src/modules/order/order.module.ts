import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderEntity } from './entities/order.entity';
import { ProductOrderEntity } from '@modules/product-order/entities/product-order.entity';
import { ProductEntity } from '@modules/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ProductOrderEntity, ProductEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
