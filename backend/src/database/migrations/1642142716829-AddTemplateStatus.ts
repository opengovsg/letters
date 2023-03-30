import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTemplateStatus1642142716829 implements MigrationInterface {
  name = 'AddTemplateStatus1642142716829'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" RENAME COLUMN "is_archived" TO "status"`,
    )
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "status"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "status" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "status"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "status" boolean NOT NULL DEFAULT false`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates" RENAME COLUMN "status" TO "is_archived"`,
    )
  }
}
