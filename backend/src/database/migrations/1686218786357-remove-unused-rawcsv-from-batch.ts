import { MigrationInterface, QueryRunner } from 'typeorm'

export class removeUnusedRawcsvFromBatch1686218786357
  implements MigrationInterface
{
  name = 'removeUnusedRawcsvFromBatch1686218786357'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "batches" DROP COLUMN "rawCsv"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "batches" ADD "rawCsv" text NOT NULL`)
  }
}
