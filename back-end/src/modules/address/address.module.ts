import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './services/address.service';
import { AddressController } from './controller/address.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AddressEntity]),
    ],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}
