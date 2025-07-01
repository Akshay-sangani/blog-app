import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750929212320 implements MigrationInterface {
    name = 'Migration1750929212320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles_permission_permission" ("rolesId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_840c403f6caab2747469bad9052" PRIMARY KEY ("rolesId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5633105c717323b1b31d36fd56" ON "roles_permission_permission" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_27fcec6fe40044fe3d2e208fea" ON "roles_permission_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" ADD CONSTRAINT "FK_5633105c717323b1b31d36fd56d" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" ADD CONSTRAINT "FK_27fcec6fe40044fe3d2e208feab" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" DROP CONSTRAINT "FK_27fcec6fe40044fe3d2e208feab"`);
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" DROP CONSTRAINT "FK_5633105c717323b1b31d36fd56d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27fcec6fe40044fe3d2e208fea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5633105c717323b1b31d36fd56"`);
        await queryRunner.query(`DROP TABLE "roles_permission_permission"`);
    }

}
