import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
 

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true
        
    })
    email: string

    @CreateDateColumn()
    date_created: Date;

    @UpdateDateColumn()
    data_updated: Date;
}