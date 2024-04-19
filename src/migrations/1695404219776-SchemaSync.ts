import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1695404219776 implements MigrationInterface {
  name = 'SchemaSync1695404219776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying DEFAULT '', "lastName" character varying DEFAULT '', "email" character varying NOT NULL, "password" character varying NOT NULL, "permissionLevel" character varying DEFAULT '1', CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
