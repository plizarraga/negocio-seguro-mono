import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAlertsTable1700510345287 implements MigrationInterface {
    name = 'CreateAlertsTable1700510345287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alerts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "device_id" character varying NOT NULL DEFAULT '', "alert_type" character varying NOT NULL DEFAULT '', "battery_level" character varying NOT NULL DEFAULT '', "current_address" character varying NOT NULL DEFAULT '', "address_id" uuid, CONSTRAINT "PK_60f895662df096bfcdfab7f4b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bde35b32d03b804b0944331ac8" ON "alerts" ("device_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f20d0879e8a106820f01e5a1e" ON "alerts" ("alert_type") `);
        await queryRunner.query(`ALTER TABLE "alerts" ADD CONSTRAINT "FK_3ff0fb4d4635ef7d5924376bb48" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alerts" DROP CONSTRAINT "FK_3ff0fb4d4635ef7d5924376bb48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f20d0879e8a106820f01e5a1e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bde35b32d03b804b0944331ac8"`);
        await queryRunner.query(`DROP TABLE "alerts"`);
    }

}
