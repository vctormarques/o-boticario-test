import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProducts1718580941418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produto',
        columns: [
          {
            name: 'produto_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome_produto',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'descricao_produto',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'preco_produto',
            type: 'numeric',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'qtd_estoque',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'data_cadastro_produto',
            type: 'date',
            default: 'CURRENT_DATE',
          },
          {
            name: 'categoria_id',
            type: 'int',
          },
          {
            name: 'imagem',
            type: 'varchar',
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'produto',
      new TableForeignKey({
        columnNames: ['categoria_id'],
        referencedColumnNames: ['categoria_id'],
        referencedTableName: 'categoria',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
