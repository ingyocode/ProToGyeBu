import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { BettingsEntity } from "@protogyebu/models";
import Hashids from "hashids";
import { Repository } from "typeorm";
import { CreateBettingInterface } from './interfaces'
import { SportService } from "../sports";

export class BettingsService {
    hashidsForCursor: Hashids;
    hashidsForUid: Hashids;
    constructor(
        @InjectRepository(BettingsEntity)
        private readonly bettingsRepository: Repository<BettingsEntity>,
        private readonly configService: ConfigService,
        private readonly sportsService: SportService
    ) {
        if (this.hashidsForCursor === undefined) {
            this.hashidsForCursor = new Hashids(this.configService.get<string>('HASH_KEY'), 32, 'abcdefghijklmnopqrstuvwxyz1234567890');
        }

        if (this.hashidsForUid === undefined) {
            this.hashidsForUid = new Hashids(this.configService.get<string>('HASH_KEY'), 32, 'abcdefghijklmnopqrstuvwxyz1234567890');
        }
    }
    encodeId(id: number): string {
        return this.hashidsForUid.encode(id);
    }

    decodeUid(uid: string): number {
        return Number(this.hashidsForUid.decode(uid)[0]);
    }
    async get(userId: string) {
        return await this.bettingsRepository.find({
            where: {
                usersId: this.decodeUid(userId)
            },
            relations: ['sports']
        });
    }

    async create(param: CreateBettingInterface) {
        try {
            const bettings = await this.bettingsRepository.save({
                usersId: param.userId,
                bettingAmount: param.bettingAmount,
                drainage: param.drainage,
            });
            param.games.forEach((game) => {
                game.bettingsId = bettings.id
            })
            console.log(...param.games)
            await this.sportsService.createGameForBetting(param.games)

            bettings.uid = this.encodeId(bettings.id);
            await this.bettingsRepository.update({ id: bettings.id }, { uid: bettings.uid });
            return bettings;
        } catch (e) {
            console.log(e)
        }
    }
}