import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProdutoPedido1718619477691 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produto_pedido',
        columns: [
          {
            name: 'produto_pedido_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'qtd_produto_pedido',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'preco_produto_pedido',
            type: 'numeric',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'produto_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'pedido_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'produto_pedido',
      new TableForeignKey({
        columnNames: ['pedido_id'],
        referencedColumnNames: ['pedido_id'],
        referencedTableName: 'pedido',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'produto_pedido',
      new TableForeignKey({
        columnNames: ['produto_id'],
        referencedColumnNames: ['produto_id'],
        referencedTableName: 'produto',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('produto_pedido');
    const foreignKeyPedido = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('pedido_id') !== -1
    );
    await queryRunner.dropForeignKey('produto_pedido', foreignKeyPedido);

    const foreignKeyProduto = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('produto_id') !== -1
    );
    await queryRunner.dropForeignKey('produto_pedido', foreignKeyProduto);

    await queryRunner.dropTable('produto_pedido');
  }
}
