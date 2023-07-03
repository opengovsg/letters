import { MigrationInterface, QueryRunner } from 'typeorm'

export class addPasswordInstructionToBatches1688119081079
  implements MigrationInterface
{
  name = 'addPasswordInstructionToBatches1688119081079'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batches" ADD "passwordInstructions" text`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batches" DROP COLUMN "passwordInstructions"`,
    )
  }
}
