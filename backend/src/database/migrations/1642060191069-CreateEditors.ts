import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateEditors1642060191069 implements MigrationInterface {
  name = 'CreateEditors1642060191069'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "editors" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "metadata" json, "template" integer NOT NULL, "user" integer NOT NULL, CONSTRAINT "REL_1b8ea56a50e51c81d6fa74f9e3" UNIQUE ("template"), CONSTRAINT "REL_e1df85ceb0796e03b6a3202ce8" UNIQUE ("user"), CONSTRAINT "PK_98bd9cd67ad6c3e6d95a83a8a27" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" ADD CONSTRAINT "FK_1b8ea56a50e51c81d6fa74f9e37" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" ADD CONSTRAINT "FK_e1df85ceb0796e03b6a3202ce86" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "editors" DROP CONSTRAINT "FK_e1df85ceb0796e03b6a3202ce86"`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" DROP CONSTRAINT "FK_1b8ea56a50e51c81d6fa74f9e37"`,
    )
    await queryRunner.query(`DROP TABLE "editors"`)
  }
}
