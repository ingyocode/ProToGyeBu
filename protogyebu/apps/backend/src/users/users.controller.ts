import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '@protogyebu/backend';
import { PostUserBodyDto } from './dtos';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post()
    async create(@Body() body: PostUserBodyDto) {
        await this.usersService.create(body);
    }
}
