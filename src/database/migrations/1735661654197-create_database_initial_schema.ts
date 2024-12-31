import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabaseInitialSchema1735661654197 implements MigrationInterface {
    name = 'CreateDatabaseInitialSchema1735661654197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(150) NOT NULL, \`last_name\` varchar(150) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone_number\` varchar(25) NOT NULL, \`address\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, INDEX \`IDX_0408cb491623b121499d4fa238\` (\`last_name\`), INDEX \`IDX_ef2fb839248017665e5033e730\` (\`first_name\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`description\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_permissions\` (\`user_id\` int NOT NULL, \`permission_id\` int NOT NULL, INDEX \`IDX_3495bd31f1862d02931e8e8d2e\` (\`user_id\`), INDEX \`IDX_8145f5fadacd311693c15e41f1\` (\`permission_id\`), PRIMARY KEY (\`user_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_permissions\` ADD CONSTRAINT \`FK_3495bd31f1862d02931e8e8d2e8\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_permissions\` ADD CONSTRAINT \`FK_8145f5fadacd311693c15e41f10\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_permissions\` DROP FOREIGN KEY \`FK_8145f5fadacd311693c15e41f10\``);
        await queryRunner.query(`ALTER TABLE \`user_permissions\` DROP FOREIGN KEY \`FK_3495bd31f1862d02931e8e8d2e8\``);
        await queryRunner.query(`DROP INDEX \`IDX_8145f5fadacd311693c15e41f1\` ON \`user_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_3495bd31f1862d02931e8e8d2e\` ON \`user_permissions\``);
        await queryRunner.query(`DROP TABLE \`user_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef2fb839248017665e5033e730\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_0408cb491623b121499d4fa238\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
