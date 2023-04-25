import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@protogyebu/backend';
import { PostAuthBodyDto, PostAuthResponseDto } from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post()
    async signIn(@Body() body: PostAuthBodyDto): Promise<PostAuthResponseDto> {
        return { token: await this.authService.signIn(body) };
    }
}
