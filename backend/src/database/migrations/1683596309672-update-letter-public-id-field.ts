import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateLetterPublicIdField1683596309672
  implements MigrationInterface
{
  name = 'updateLetterPublicIdField1683596309672'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "letters" DROP COLUMN "publicId"`)
    await queryRunner.query(
      `ALTER TABLE "letters" ADD "publicId" character varying(255)`,
    )
    await queryRunner.query(`UPDATE "letters" SET "publicId" = "id"`)
    await queryRunner.query(
      `ALTER TABLE "letters" ALTER COLUMN "publicId" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "letters" ADD CONSTRAINT "UQ_cfe06d7f8cda8902e25c03c0c70" UNIQUE ("publicId")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "letters" DROP CONSTRAINT "UQ_cfe06d7f8cda8902e25c03c0c70"`,
    )
    await queryRunner.query(`ALTER TABLE "letters" DROP COLUMN "publicId"`)
    await queryRunner.query(`ALTER TABLE "letters" ADD "publicId" text`)
  }
}
