import { MigrationInterface, QueryRunner } from 'typeorm'

export class addNotificationsEntity1687918275168 implements MigrationInterface {
  name = 'addNotificationsEntity1687918275168'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_channel_enum" AS ENUM('SINGPASS', 'TWILIO', 'POSTMAN')`,
    )
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "channel" "public"."notifications_channel_enum" NOT NULL, "letter_id" integer NOT NULL, "uuid" character varying(255) NOT NULL, "message" text NOT NULL, "recipient" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_84989adc90ebf9f1c9b7ba66f0a" UNIQUE ("uuid"), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"`)
    await queryRunner.query(`DROP TYPE "public"."notifications_channel_enum"`)
  }
}
