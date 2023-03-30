import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixRelations1642404241553 implements MigrationInterface {
  name = 'FixRelations1642404241553'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "FK_dded581013fa728069e9ddbd6e5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "REL_dded581013fa728069e9ddbd6e"`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "FK_00062ed3b46ba7c7a86e991e4d8"`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "FK_fc6d730a04921adfe0a4b7669b9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "REL_00062ed3b46ba7c7a86e991e4d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "REL_fc6d730a04921adfe0a4b7669b"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "FK_22c0c429da953ad79271057e365"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "FK_d3f0d2ee808c09471098b308d67"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "REL_22c0c429da953ad79271057e36"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "REL_d3f0d2ee808c09471098b308d6"`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "FK_ee34c5866c93c11f7095bdbd702"`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "FK_cb5c213b2f814ba737ac9b50f1f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "REL_ee34c5866c93c11f7095bdbd70"`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "REL_cb5c213b2f814ba737ac9b50f1"`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" DROP CONSTRAINT "FK_1b8ea56a50e51c81d6fa74f9e37"`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" DROP CONSTRAINT "FK_e1df85ceb0796e03b6a3202ce86"`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" DROP CONSTRAINT "REL_1b8ea56a50e51c81d6fa74f9e3"`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" DROP CONSTRAINT "REL_e1df85ceb0796e03b6a3202ce8"`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "FK_dded581013fa728069e9ddbd6e5" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "FK_00062ed3b46ba7c7a86e991e4d8" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "FK_fc6d730a04921adfe0a4b7669b9" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "FK_22c0c429da953ad79271057e365" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "FK_d3f0d2ee808c09471098b308d67" FOREIGN KEY ("editor") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "FK_ee34c5866c93c11f7095bdbd702" FOREIGN KEY ("template_version") REFERENCES "template_versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "FK_cb5c213b2f814ba737ac9b50f1f" FOREIGN KEY ("issuer") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "FK_cb5c213b2f814ba737ac9b50f1f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" DROP CONSTRAINT "FK_ee34c5866c93c11f7095bdbd702"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "FK_d3f0d2ee808c09471098b308d67"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP CONSTRAINT "FK_22c0c429da953ad79271057e365"`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "FK_fc6d730a04921adfe0a4b7669b9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" DROP CONSTRAINT "FK_00062ed3b46ba7c7a86e991e4d8"`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "FK_dded581013fa728069e9ddbd6e5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" ADD CONSTRAINT "REL_e1df85ceb0796e03b6a3202ce8" UNIQUE ("user")`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" ADD CONSTRAINT "REL_1b8ea56a50e51c81d6fa74f9e3" UNIQUE ("template")`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" ADD CONSTRAINT "FK_e1df85ceb0796e03b6a3202ce86" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "editors" ADD CONSTRAINT "FK_1b8ea56a50e51c81d6fa74f9e37" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "REL_cb5c213b2f814ba737ac9b50f1" UNIQUE ("issuer")`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "REL_ee34c5866c93c11f7095bdbd70" UNIQUE ("template_version")`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "FK_cb5c213b2f814ba737ac9b50f1f" FOREIGN KEY ("issuer") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "memos" ADD CONSTRAINT "FK_ee34c5866c93c11f7095bdbd702" FOREIGN KEY ("template_version") REFERENCES "template_versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "REL_d3f0d2ee808c09471098b308d6" UNIQUE ("editor")`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "REL_22c0c429da953ad79271057e36" UNIQUE ("template")`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "FK_d3f0d2ee808c09471098b308d67" FOREIGN KEY ("editor") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD CONSTRAINT "FK_22c0c429da953ad79271057e365" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "REL_fc6d730a04921adfe0a4b7669b" UNIQUE ("user")`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "REL_00062ed3b46ba7c7a86e991e4d" UNIQUE ("template")`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "FK_fc6d730a04921adfe0a4b7669b9" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD CONSTRAINT "FK_00062ed3b46ba7c7a86e991e4d8" FOREIGN KEY ("template") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "REL_dded581013fa728069e9ddbd6e" UNIQUE ("author")`,
    )
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "FK_dded581013fa728069e9ddbd6e5" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
