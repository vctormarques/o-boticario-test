import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { AddressModule } from '@modules/address/address.module';
import { PasswordService } from './services/password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    forwardRef(() => AddressModule),
  ],
  controllers: [ClientController],
  providers: [ClientService, PasswordService,],
  exports: [ClientService, TypeOrmModule.forFeature([ClientEntity])],
})
export class ClientModule {}
