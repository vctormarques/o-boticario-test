import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePedido1718603691059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pedido',
        columns: [
          {
            name: 'pedido_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'numero_pedido',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'valor_total_pedido',
            type: 'numeric',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'data_pedido',
            type: 'date',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'cliente_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['cliente_id'],
            referencedTableName: 'cliente',
            referencedColumnNames: ['cliente_id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pedido');
  }
}
