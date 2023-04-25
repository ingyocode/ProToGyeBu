import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { UsersInterface } from './interfaces'

@Entity('users')
export class UsersEntity implements UsersInterface {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ type: 'varchar', nullable: true })
    uid: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar' })
    encKey: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'boolean' })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}