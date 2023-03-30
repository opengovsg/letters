import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMemos1642063221294 implements MigrationInterface {
  name = 'CreateMemos1642063221294'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "memos" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "metadata" json, "uin" character varying NOT NULL, "uin_type" character varying NOT NULL, "slug" character varying NOT NULL, "params" json NOT NULL, "expires_at" TIMESTAMP, "is_viewed" boolean NOT NULL DEFAULT false, "is_void" boolean NOT NULL DEFAULT false, "void_reason" character varying, "template_version" integer NOT NULL, "issuer" integer NOT NULL, CONSTRAINT "REL_ee34c5866c93c11f7095bdbd70" UNIQUE ("template_version"), CONSTRAINT "REL_cb5c213b2f814ba737ac9b50f1" UNIQUE ("issuer"), CONSTRAINT "PK_5f005ade603ff6ea114dcacde0b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3b95f052140cf95f2d68d6b046" ON "memos" ("slug") `,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "FK_ee34c5866c93c11f7095bdbd702" FOREIGN KEY ("template_version") REFERENCES "template_versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "FK_cb5c213b2f814ba737ac9b50f1f" FOREIGN KEY ("issuer") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "FK_cb5c213b2f814ba737ac9b50f1f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "FK_ee34c5866c93c11f7095bdbd702"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3b95f052140cf95f2d68d6b046"`,
    )
    await queryRunner.query(`DROP TABLE "memos"`)
  }
}
