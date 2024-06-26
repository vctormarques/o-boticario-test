import configuration from '@config/configuration';
import { AddressModule } from '@modules/address/address.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoryModule } from '@modules/category/category.module';
import { ClientModule } from '@modules/client/client.module';
import { TypeOrmConfigService } from '@modules/database/services/typeorm-config.service';
import { OrderModule } from '@modules/order/order.module';
import { ProductModule } from '@modules/product/product.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { SeedService } from '@config/SeedService';

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
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  providers: [SeedService], 
})
export class AppModule {}
