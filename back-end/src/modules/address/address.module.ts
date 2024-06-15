import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './services/address.service';
import { AddressController } from './controller/address.controller';
import { ClientModule } from '@modules/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]),
    forwardRef(() => ClientModule),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule],
})
export class AddressModule {}
