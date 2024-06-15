import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategory1718412547505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categoria',
            columns: [
                {
                    name: 'categoria_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'nome_categoria',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'descricao_categoria',
                    type: 'varchar',
                    length: '200',
                    isNullable: true,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categoria');
    }

}
