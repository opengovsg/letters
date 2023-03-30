import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTemplateVersions1642061421917 implements MigrationInterface {
  name = 'CreateTemplateVersions1642061421917'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "template_versions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "metadata" json, "body" character varying NOT NULL, "params_required" json NOT NULL, "is_latest_version" boolean NOT NULL DEFAULT true, "template" integer NOT NULL, "editor" integer NOT NULL, CONSTRAINT "REL_22c0c429da953ad79271057e36" UNIQUE ("template"), CONSTRAINT "REL_d3f0d2ee808c09471098b308d6" UNIQUE ("editor"), CONSTRAINT "PK_cfc439255ca2725f4102c554d41" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "FK_22c0c429da953ad79271057e365" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "FK_d3f0d2ee808c09471098b308d67" FOREIGN KEY ("editor") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "FK_d3f0d2ee808c09471098b308d67"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "FK_22c0c429da953ad79271057e365"`,
    )
    await queryRunner.query(`DROP TABLE "template_versions"`)
  }
}
