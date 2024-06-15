import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { resolve } from "path";

const SOURCE_PATH = resolve(__dirname,'..', '..', '..');

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly cfg: ConfigService) {}

    createTypeOrmOptions(name: string): TypeOrmModuleOptions {
        const defaultConfig = {
            type: 'mysql',
            name: 'default',
            host: this.cfg.get('DB_HOST'),
            port: this.cfg.get('DB_PORT'),
            username: this.cfg.get('DB_USER'),
            password:  this.cfg.get('DB_PASS'),
            database: this.cfg.get('DB_NAME'),
            entities: this.cfg.get<string[]>('orm.entities'),
            synchronize: this.cfg.get<boolean>('orm.synchronize'),
            migrations: this.cfg.get<string[]>('orm.migrations'),
            migrationsRun: this.cfg.get<boolean>('orm.migrationsRun'),
            cli: {
                migrationsRun: this.cfg.get<string>('orm.cli.migrationsRun'),
            }
        };    
        
        const connections = {
            default: defaultConfig
        };

        return connections[name] || defaultConfig;
    }
}   
