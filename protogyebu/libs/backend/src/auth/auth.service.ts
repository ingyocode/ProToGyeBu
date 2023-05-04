import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "@protogyebu/models";
import { pbkdf2Sync } from "crypto";
import { Repository } from "typeorm";
import { PostAuthBodyInterface } from "./interfaces";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private readonly jwtService: JwtService
    ) { }
    async signIn(param: PostAuthBodyInterface): Promise<string> {
        const user = await this.usersRepository.findOne({
            where: {
                email: param.email
            }
        });

        if (!user) {
            throw new HttpException('존재하지 않는 유저입니다.', HttpStatus.BAD_REQUEST)
        }

        const encryptPassword =
            param.password &&
            pbkdf2Sync(param.password, user.encKey, 131072, 64, 'sha512').toString('base64');
        if (encryptPassword !== user.password) {
            throw new HttpException('올바르지 않은 비밀번호입니다.', HttpStatus.BAD_REQUEST)
        }

        return this.jwtService.sign({ uid: user.uid, email: user.email }, { expiresIn: '7d' })
    }
}