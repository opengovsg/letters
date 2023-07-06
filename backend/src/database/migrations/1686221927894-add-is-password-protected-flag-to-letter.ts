import { MigrationInterface, QueryRunner } from 'typeorm'

export class addIsPasswordProtectedFlagToLetter1686221927894
  implements MigrationInterface
{
  name = 'addIsPasswordProtectedFlagToLetter1686221927894'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "letters" ADD "isPasswordProtected" boolean NOT NULL DEFAULT FALSE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "letters" DROP COLUMN "isPasswordProtected"`,
    )
  }
}
