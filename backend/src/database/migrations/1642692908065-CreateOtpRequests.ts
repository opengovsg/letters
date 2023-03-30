import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOtpRequests1642692908065 implements MigrationInterface {
  name = 'CreateOtpRequests1642692908065'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "otp_requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "metadata" jsonb, "email" character varying NOT NULL, "tries" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_3ed73f534c952db2081b62d44fb" UNIQUE ("email"), CONSTRAINT "PK_265771409bf4605d16150e2d045" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "otp_requests"`)
  }
}
