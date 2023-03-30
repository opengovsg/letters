import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTemplates1642059833739 implements MigrationInterface {
  name = 'CreateTemplates1642059833739'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "templates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "metadata" json, "name" character varying NOT NULL, "is_archived" boolean NOT NULL DEFAULT false, "author" integer NOT NULL, CONSTRAINT "REL_dded581013fa728069e9ddbd6e" UNIQUE ("author"), CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "FK_dded581013fa728069e9ddbd6e5" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "FK_dded581013fa728069e9ddbd6e5"`,
    )
    await queryRunner.query(`DROP TABLE "templates"`)
  }
}
