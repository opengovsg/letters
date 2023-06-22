import { MigrationInterface, QueryRunner } from 'typeorm'

export class addFirstReadAtColumnToLetter1687250665550
  implements MigrationInterface
{
  name = 'addFirstReadAtColumnToLetter1687250665550'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "letters" ADD "firstReadAt" TIMESTAMP WITH TIME ZONE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "letters" DROP COLUMN "firstReadAt"`)
  }
}
