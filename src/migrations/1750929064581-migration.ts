import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750929064581 implements MigrationInterface {
    name = 'Migration1750929064581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdAt"`);
    }

}
