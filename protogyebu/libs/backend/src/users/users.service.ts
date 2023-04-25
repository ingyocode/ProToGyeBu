import { UsersEntity } from "@protogyebu/models";
import { Repository } from "typeorm";
import { CreateUserInterface } from "./interfaces";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ) { }
    async create(param: CreateUserInterface) {
        const existedUser = await this.usersRepository.findOne({
            where: {
                email: param.email
            }
        });
        if (existedUser) {

        }
    }
}