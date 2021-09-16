import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class imya1619806513572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "password",
                    type:"varchar"
                },
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: "songs",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "artist",
                    type: "varchar",
                },
                {
                    name: "songname",
                    type: "varchar"
                }
            ]

        }), true)

        await queryRunner.createTable(new Table({
            name: "user_Music",
            columns: [
                {
                    name: "user_id",
                    type: "int"
                },
                {
                    name: "song_id",
                    type: "int"
                }
            ]
        }), true)

        await queryRunner.createForeignKey("user_Music", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            name: 'user_music_user_id',
            referencedTableName: "users",
            onDelete: "CASCADE"
        }))

        await queryRunner.createForeignKey("user_Music", new TableForeignKey({
            columnNames: ["song_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "songs",
            name: 'user_music_song_id',
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_Music','user_music_user_id')
        await queryRunner.dropForeignKey('user_Music','user_music_song_id')
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("songs");
        await queryRunner.dropTable("user_Music");
    }

}
