import { MigrationInterface, QueryRunner } from 'typeorm'

export class UseJsonb1642143771390 implements MigrationInterface {
  name = 'UseJsonb1642143771390'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "metadata" jsonb`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "api_key_scopes"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "api_key_scopes" jsonb`)
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "templates" ADD "metadata" jsonb`)
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "issuers" ADD "metadata" jsonb`)
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "metadata"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "metadata" jsonb`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "params_required"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "params_required" jsonb NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "memos" ADD "metadata" jsonb`)
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "params"`)
    await queryRunner.query(`ALTER TABLE "memos" ADD "params" jsonb NOT NULL`)
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "editors" ADD "metadata" jsonb`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "editors" ADD "metadata" json`)
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "params"`)
    await queryRunner.query(`ALTER TABLE "memos" ADD "params" json NOT NULL`)
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "memos" ADD "metadata" json`)
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "params_required"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "params_required" json NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "metadata"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "metadata" json`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "issuers" ADD "metadata" json`)
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "templates" ADD "metadata" json`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "api_key_scopes"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "api_key_scopes" json`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "metadata"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "metadata" json`)
  }
}
