import { MigrationInterface, QueryRunner } from 'typeorm'

export class createNotificationTable1688451439664
  implements MigrationInterface
{
  name = 'createNotificationTable1688451439664'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "channel" text NOT NULL, "letterId" integer NOT NULL, "providerId" character varying(255), "message" text NOT NULL, "recipient" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_448ee2ab315e4442c1b1f00f22c" UNIQUE ("providerId"), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_8a61dbe5eceea51702872962568" FOREIGN KEY ("letterId") REFERENCES "letters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notifications" DROP CONSTRAINT "FK_8a61dbe5eceea51702872962568"`,
    )
    await queryRunner.query(`DROP TABLE "notifications"`)
  }
}
