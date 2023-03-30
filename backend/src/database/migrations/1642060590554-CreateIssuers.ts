import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateIssuers1642060590554 implements MigrationInterface {
  name = 'CreateIssuers1642060590554'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "issuers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "metadata" json, "template" integer NOT NULL, "user" integer NOT NULL, CONSTRAINT "REL_00062ed3b46ba7c7a86e991e4d" UNIQUE ("template"), CONSTRAINT "REL_fc6d730a04921adfe0a4b7669b" UNIQUE ("user"), CONSTRAINT "PK_36d87e2e6d1edfcbdc561deeaf9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "FK_00062ed3b46ba7c7a86e991e4d8" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "FK_fc6d730a04921adfe0a4b7669b9" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "FK_fc6d730a04921adfe0a4b7669b9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "FK_00062ed3b46ba7c7a86e991e4d8"`,
    )
    await queryRunner.query(`DROP TABLE "issuers"`)
  }
}
