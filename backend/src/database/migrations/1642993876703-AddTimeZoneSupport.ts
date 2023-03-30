import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTimeZoneSupport1642993876703 implements MigrationInterface {
  name = 'AddTimeZoneSupport1642993876703'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "deleted_at"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "deleted_at"`)
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "updated_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "deleted_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "memos" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "memos" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "deleted_at"`)
    await queryRunner.query(
      `ALTER TABLE "memos" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "expires_at"`)
    await queryRunner.query(
      `ALTER TABLE "memos" ADD "expires_at" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" DROP COLUMN "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" DROP COLUMN "updated_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" DROP COLUMN "deleted_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    )
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "editors" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "editors" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "deleted_at"`)
    await queryRunner.query(
      `ALTER TABLE "editors" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "editors" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "editors" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "editors" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "editors" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" DROP COLUMN "deleted_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" ADD "deleted_at" TIMESTAMP`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" DROP COLUMN "updated_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" DROP COLUMN "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "otp_requests" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "expires_at"`)
    await queryRunner.query(`ALTER TABLE "memos" ADD "expires_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "memos" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "memos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "memos" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "memos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "deleted_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "deleted_at" TIMESTAMP`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "updated_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" DROP COLUMN "created_at"`,
    )
    await queryRunner.query(
      `ALTER TABLE "template_versions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "issuers" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "issuers" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "issuers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "deleted_at"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "deleted_at" TIMESTAMP`,
    )
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "templates" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    )
  }
}
