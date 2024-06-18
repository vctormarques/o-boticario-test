import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async seed() {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      const seedExecuted = await queryRunner.query(`
        SELECT COUNT(*) as count FROM seeds WHERE seed_name = 'initial_seed';
      `);

      if (seedExecuted[0].count > 0) {
        return;
      }

      await queryRunner.startTransaction();

      await queryRunner.query(`
        INSERT INTO endereco (cep, rua, bairro, cidade, numero, complemento, uf)
        VALUES ('75523170', 'Rua Getulio Vargas', 'Centro', 'Itumbiara', '123', 'apto1506', 'GO');
      `);

      const enderecoId = await queryRunner.query(
        `SELECT LAST_INSERT_ID() AS id;`
      );

      await queryRunner.query(`
        INSERT INTO cliente (email, username, senha, nome, cpf, telefone, data_nascimento, endereco_id)
        VALUES ('teste@teste.com.br', 'admin', '$2a$10$1OuNiNiZpB7RDm7naOkjiuO4q6EE8R3.hGWWLj/hdQWl17iMkgiU6', 'Teste de Oliveira', '12345678912', '64999999999', '1993-11-16', ${enderecoId[0].id});
      `);

      const clienteId = await queryRunner.query(
        `SELECT LAST_INSERT_ID() AS id;`
      );

      await queryRunner.query(`
        INSERT INTO categoria (nome_categoria, descricao_categoria)
        VALUES ('Combos', 'Perfumaria');
      `);

      const categoriaId = await queryRunner.query(
        `SELECT LAST_INSERT_ID() AS id;`
      );

      await queryRunner.query(`
        INSERT INTO produto (nome_produto, descricao_produto, preco_produto, qtd_estoque, categoria_id)
        VALUES ('ZAAD', 'Perfum', 269.90, 567, ${categoriaId[0].id});
      `);

      const produtoId = await queryRunner.query(
        `SELECT LAST_INSERT_ID() AS id;`
      );

      await queryRunner.query(`
        INSERT INTO pedido (numero_pedido, valor_total_pedido, status, cliente_id)
        VALUES ('10', 539.80, true, ${clienteId[0].id});
      `);

      const pedidoId = await queryRunner.query(
        `SELECT LAST_INSERT_ID() AS id;`
      );

      await queryRunner.query(`
        INSERT INTO produto_pedido (qtd_produto_pedido, preco_produto_pedido, produto_id, pedido_id)
        VALUES (2, 269.90, ${produtoId[0].id}, ${pedidoId[0].id});
      `);

      await queryRunner.query(`
        INSERT INTO seeds (seed_name)
        VALUES ('initial_seed');
      `);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
