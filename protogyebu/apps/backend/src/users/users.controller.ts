import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '@protogyebu/backend';
import { PostUserBodyDto, PostUserResponseDto } from './dtos';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @ApiOperation({ summary: '회원 가입', description: '유저 가입' })
    @ApiOkResponse({ status: 201, description: '유저 생성이 정상적으로 진행될 경우', type: PostUserResponseDto })
    @ApiBadRequestResponse({ status: 400, description: '기존에 존재하던 유저가 가입할 경우' })
    @Post()
    async create(@Body() body: PostUserBodyDto): Promise<PostUserResponseDto> {
        const user = await this.usersService.create(body);
        return {
            uid: user.uid,
            email: user.email,
            name: user.name
        }
    }
}
