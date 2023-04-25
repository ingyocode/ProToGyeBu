import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UsersInterface } from './interfaces'

@Entity('users')
export class UsersEntity implements UsersInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ type: 'varchar', nullable: true, unique: true })
    uid: string;

    @Index()
    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    encKey: string;

    @Column({ type: 'varchar' })
    name: string;

    @Index()
    @Column({ type: 'boolean' })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}