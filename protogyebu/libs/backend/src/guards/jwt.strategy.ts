import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Hashids from "hashids";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from "./jwt-constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    hashids: Hashids;
    hashKey = jwtConstants.hashKey;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
        if (this.hashids === undefined) {
            this.hashids = new Hashids(this.hashKey, 32, 'abcdefghijklmnopqrstuvwxyz1234567890');
        }
    }

    async validate(payload) {
        if (payload.exp) {
            const now = new Date(),
                expiredTime = new Date(payload.exp * 1000);
            if (expiredTime < now) {
                throw new HttpException("만료된 토큰입니다.", HttpStatus.UNAUTHORIZED);
            }
        }
        return payload;
    }
}
