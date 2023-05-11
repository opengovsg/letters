import { MigrationInterface, QueryRunner } from 'typeorm'

export class createLetterTemplateBatchTables1683083199198
  implements MigrationInterface
{
  name = 'createLetterTemplateBatchTables1683083199198'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "templates" ("id" SERIAL NOT NULL, "fields" jsonb NOT NULL DEFAULT '{}', "html" text NOT NULL, "name" text NOT NULL, "thumbnailS3Path" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "batches" ("id" SERIAL NOT NULL, "templateId" integer NOT NULL, "userId" integer NOT NULL, "rawCsv" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_55e7ff646e969b61d37eea5be7a" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "letters" ("id" SERIAL NOT NULL, "batchId" integer NOT NULL, "publicId" text NOT NULL, "templateId" integer NOT NULL, "userId" integer NOT NULL, "issuedLetter" text NOT NULL, "fieldValues" text NOT NULL, "shortLink" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bf70c41d26aa84cf2651d571889" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "batches" ADD CONSTRAINT "FK_dc6a9484faf81fccdea79b2d28a" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "batches" ADD CONSTRAINT "FK_1cab53eed12b1a418ac2cc0480f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "letters" ADD CONSTRAINT "FK_4b5b5f43bd7db72c55269cc3797" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "letters" ADD CONSTRAINT "FK_a0072127cb6f0fe15ae69e44143" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "letters" ADD CONSTRAINT "FK_6922f0999690f2206531a1bf6ee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "letters" DROP CONSTRAINT "FK_6922f0999690f2206531a1bf6ee"`
    )
    await queryRunner.query(
      `ALTER TABLE "letters" DROP CONSTRAINT "FK_a0072127cb6f0fe15ae69e44143"`
    )
    await queryRunner.query(
      `ALTER TABLE "letters" DROP CONSTRAINT "FK_4b5b5f43bd7db72c55269cc3797"`
    )
    await queryRunner.query(
      `ALTER TABLE "batches" DROP CONSTRAINT "FK_1cab53eed12b1a418ac2cc0480f"`
    )
    await queryRunner.query(
      `ALTER TABLE "batches" DROP CONSTRAINT "FK_dc6a9484faf81fccdea79b2d28a"`
    )
    await queryRunner.query(`DROP TABLE "letters"`)
    await queryRunner.query(`DROP TABLE "batches"`)
    await queryRunner.query(`DROP TABLE "templates"`)
  }
}
