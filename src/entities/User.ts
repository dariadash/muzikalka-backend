import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "./Song";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'varchar'
    })
    login: string;

    @Column({
        type:'varchar',
        select: false
    })
    password:string;
    
    @ManyToMany(() => Song, (song) => song.users)
    @JoinTable({
        name: 'user_music',
        joinColumn: {
            name: 'song_id'
        }
    })
    songs:Song[]
}