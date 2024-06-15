import { TypeOrmConfigService } from '@modules/database/services/typeorm-config.service';
import {
  INestApplication,
  Logger,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

export class Kernel {
  constructor(private readonly app: INestApplication) {}

  static validationPipeConfig: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
    transform: true,
  };
  async boot() {
    const cfg = this.app.get(ConfigService);
    const port = cfg.get<number>('port');
    const context = Kernel.name;

    const callback = () => Logger.log(`API rodando na porta ${port}`, context);

    return this.app.listen(port, callback);
  }

  generateSwaggerDoc() {
    const cfg = this.app.get(ConfigService);
    const version = cfg.get<string>('version');

    const config = new DocumentBuilder()
      .setTitle('Boticário')
      .setDescription('API do Boticário')
      .setVersion(version)
      .build();

    const document = SwaggerModule.createDocument(this.app, config);

    SwaggerModule.setup('docs', this.app, document);

    return this;
  }

  createORMConfigJSON() {
    const typeOrmConfig = this.app.get(TypeOrmConfigService);
    const connections = [
      typeOrmConfig.createTypeOrmOptions('default'),
    ];

    writeFileSync(
      `${process.cwd()}/ormconfig.json`,
      JSON.stringify(connections, null, 2),
    );
    
    return this;
  }
}
