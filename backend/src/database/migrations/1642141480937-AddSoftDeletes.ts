import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSoftDeletes1642141480937 implements MigrationInterface {
  name = 'AddSoftDeletes1642141480937'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "deleted_at" TIMESTAMP`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "deleted_at" TIMESTAMP`,
    )
    await queryRunner.query(`ALTER TABLE "memos" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "editors" ADD "deleted_at" TIMESTAMP`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "deleted_at"`)
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "deleted_at"`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
  }
}
