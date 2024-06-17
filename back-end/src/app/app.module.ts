import configuration from '@config/configuration';
import { AddressModule } from '@modules/address/address.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoryModule } from '@modules/category/category.module';
import { ClientModule } from '@modules/client/client.module';
import { TypeOrmConfigService } from '@modules/database/services/typeorm-config.service';
import { ProductModule } from '@modules/product/product.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get('logger.level') || 'info',
          transport: configService.get('logger.transport'),
          redact: ['req.headers.authorization'],
        },
      }),
    }),
    EventEmitterModule.forRoot({ wildcard: true, maxListeners: 12 }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    CategoryModule,
    AddressModule,
    ClientModule,
    ProductModule,
  ],
})
export class AppModule {}
