import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateButtonsTable1700453085096 implements MigrationInterface {
    name = 'CreateButtonsTable1700453085096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buttons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL DEFAULT '', "address_id" uuid, CONSTRAINT "PK_0b55de60f80b00823be7aff0de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_db96f12391a5f4401ec7197c39" ON "buttons" ("code") `);
        await queryRunner.query(`ALTER TABLE "buttons" ADD CONSTRAINT "FK_7cd9aa7f25d00ed063613cfc411" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buttons" DROP CONSTRAINT "FK_7cd9aa7f25d00ed063613cfc411"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db96f12391a5f4401ec7197c39"`);
        await queryRunner.query(`DROP TABLE "buttons"`);
    }

}
