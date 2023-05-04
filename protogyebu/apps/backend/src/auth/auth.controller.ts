import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@protogyebu/backend';
import { PostAuthBodyDto, PostAuthResponseDto } from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @ApiOperation({ summary: '로그인', description: '로그인' })
    @ApiOkResponse({ status: 201, description: '정상적인 요청이 될 경우', type: PostAuthResponseDto })
    @ApiBadRequestResponse({ status: 400, description: '이메일 혹은 비밀번호가 틀릴 경우' })
    @Post()
    async signIn(@Body() body: PostAuthBodyDto): Promise<PostAuthResponseDto> {
        return { token: await this.authService.signIn(body) };
    }
}
