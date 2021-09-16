import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumn1620157614747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("songs", new TableColumn({
            name: "fileName",
            type: "varchar"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("songs", "fileName");
    }

}
