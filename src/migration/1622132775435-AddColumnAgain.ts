import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnAgain1622132775435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("songs", new TableColumn({
            name: "duration",
            type: "integer",
            isNullable: true
        }));
        await queryRunner.addColumn("songs", new TableColumn({
            name: "picture",
            type: "varchar",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("songs", "duration");
        await queryRunner.dropColumn("songs", "picture");
    }

}
