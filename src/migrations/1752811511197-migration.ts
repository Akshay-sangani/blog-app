import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1752811511197 implements MigrationInterface {
    name = 'Migration1752811511197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "phone" bigint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "phone" integer`);
    }

}
