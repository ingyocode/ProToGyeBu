import { UsersEntity, UsersInterface } from "@protogyebu/models";
import { Repository } from "typeorm";
import { CreateUserInterface } from "./interfaces";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomBytes, pbkdf2Sync } from "crypto";
import Hashids from 'hashids';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
    hashidsForCursor: Hashids;
    hashidsForUid: Hashids;
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private readonly configService: ConfigService
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
    async create(param: CreateUserInterface): Promise<UsersInterface> {
        const existedUser = await this.usersRepository.findOne({
            where: {
                email: param.email,
                isDeleted: false,
            }
        });
        if (existedUser) {
            throw new HttpException("이미 존재하는 email입니다.", HttpStatus.BAD_REQUEST)
        }

        const buffer = randomBytes(64).toString('base64'),
            encryptPassword =
                param.password &&
                pbkdf2Sync(param.password, buffer, 131072, 64, 'sha512').toString('base64');
        const entity = await this.usersRepository.save({
            email: param.email,
            name: param.name,
            encKey: buffer,
            password: encryptPassword,
        });
        entity.uid = this.encodeId(entity.id);
        await this.usersRepository.update({ id: entity.id }, { uid: entity.uid })
        return entity;
    }
}