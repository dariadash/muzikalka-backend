import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar"
    })
    artist: string;

    @Column({
        type: "varchar"
    })
    songname: string;

    @Column({
        type: "varchar"
    })
    fileName: string;

    @Column({
        type: "integer",
        nullable: true
    })
    duration: number;

    @Column({
        type: "varchar",
        nullable: true
    })
    picture: string

    @ManyToMany(() => User, user => user.songs,{})
    @JoinTable({
        name: 'user_music',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users: User[]
}