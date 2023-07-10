import { MigrationInterface, QueryRunner } from 'typeorm'

export class addPasswordInstructionsToBatches1688491822294
  implements MigrationInterface
{
  name = 'addPasswordInstructionsToBatches1688491822294'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batches" ADD "passwordInstructions" text NOT NULL DEFAULT ''`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batches" DROP COLUMN "passwordInstructions"`,
    )
  }
}
