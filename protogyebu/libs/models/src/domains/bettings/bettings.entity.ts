import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { BettingsInterface } from './interfaces'
import { UsersEntity, UsersInterface } from '../users';
import { SportsInterface } from '../sports';

@Entity('bettings')
export class BettingsEntity implements BettingsInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ type: 'varchar', nullable: true, unique: true })
    uid: string;

    @Index()
    @Column({ type: 'int', nullable: false })
    usersId: number;

    @Column({ type: 'boolean' })
    status: boolean;

    @Column({ type: 'int' })
    bettingAmount: number;

    @Column({ type: 'float' })
    drainage: number;

    @Index()
    @Column({ type: 'boolean' })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @JoinColumn({ name: 'users_id', referencedColumnName: 'id' })
    @ManyToOne(() => UsersEntity, (users) => users.bettings)
    user?: UsersInterface;

    @OneToMany('SportsEntity', 'betting')
    sports?: SportsInterface[]
}