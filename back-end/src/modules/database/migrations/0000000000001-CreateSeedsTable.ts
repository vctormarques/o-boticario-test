import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSeedsTable0000000000001 implements MigrationInterface {
  name = 'CreateSeedsTable0000000000001'
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS seeds (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seed_name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS seeds`);
  }
}
