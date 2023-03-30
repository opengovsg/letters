import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTemplateVersionNumber1642155636867
  implements MigrationInterface
{
  name = 'AddTemplateVersionNumber1642155636867'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "version" integer NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "version"`,
    )
  }
}
