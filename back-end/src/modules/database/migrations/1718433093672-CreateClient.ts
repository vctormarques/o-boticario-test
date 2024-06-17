import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateClient1718433093672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cliente',
            columns: [
                {
                    name: 'cliente_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '15',
                    isNullable: true,
                },
                {
                    name: 'senha',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    length: '200',
                    isNullable: true,
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                    length: '11',
                    isNullable: true,
                },
                {
                    name: 'telefone',
                    type: 'varchar',
                    length: '11',
                    isNullable: true,
                },
                {
                    name: 'data_nascimento',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'endereco_id',
                    type: 'int',
                    isNullable: true,
                }
            ]
        }));

        await queryRunner.createForeignKey('cliente', new TableForeignKey({
            columnNames: ['endereco_id'],
            referencedColumnNames: ['endereco_id'],
            referencedTableName: 'endereco',
            onDelete: 'SET NULL',
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('cliente');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('endereco_id') !== -1);
        await queryRunner.dropForeignKey('cliente', foreignKey);

        await queryRunner.dropTable('cliente');

        await queryRunner.dropTable('endereco');
    }

}
