import { MigrationInterface, QueryRunner } from 'typeorm'

export class UseJsonTemplateBody1642158187300 implements MigrationInterface {
  name = 'UseJsonTemplateBody1642158187300'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "body"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "body" jsonb NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "body"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "body" character varying NOT NULL`,
    )
  }
}
