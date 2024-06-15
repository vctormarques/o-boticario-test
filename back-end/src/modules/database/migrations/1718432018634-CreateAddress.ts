import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddress1718432018634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'endereco',
            columns: [
                {
                    name: 'endereco_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'cep',
                    type: 'varchar',
                    length: '9',
                    isNullable: true,
                },
                {
                    name: 'rua',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'bairro',
                    type: 'varchar',
                    length: '30',
                    isNullable: true,
                },
                {
                    name: 'cidade',
                    type: 'varchar',
                    length: '30',
                    isNullable: true,
                },
                {
                    name: 'numero',
                    type: 'varchar',
                    length: '10',
                    isNullable: true,
                },
                {
                    name: 'complemento',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'uf',
                    type: 'varchar',
                    length: '2',
                    isNullable: true,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('endereco');
    }

}
