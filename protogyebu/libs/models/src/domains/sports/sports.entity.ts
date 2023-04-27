import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BettingType, GamesInterface } from './interfaces'
import { BettingsEntity } from '../bettings';
import { BettingsInterface } from '../bettings/interfaces';

@Entity('sports')
export class SportsEntity implements GamesInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ type: 'int', nullable: false })
    bettingsId: number;

    @Index()
    @Column({ type: 'varchar', nullable: true, unique: true })
    uid: string;

    @Index()
    @Column({ type: 'varchar', nullable: true })
    gameId: string;

    @Column({ type: 'varchar' })
    bettingType: BettingType;

    @Column({ type: 'int' })
    bettingScore: number;

    @Column({ type: 'boolean' })
    result: boolean;

    @JoinColumn({ name: 'bettings_id', referencedColumnName: 'id' })
    @ManyToOne(() => BettingsEntity, (bettings) => bettings.sports)
    betting?: BettingsInterface;
}