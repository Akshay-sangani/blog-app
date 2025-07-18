import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752811616291 implements MigrationInterface {
    name = 'Migration1752811616291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "phone" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "phone" integer`);
    }

}
