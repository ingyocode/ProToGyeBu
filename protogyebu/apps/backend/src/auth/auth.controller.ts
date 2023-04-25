import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@protogyebu/backend';

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post()
    signIn() {
        this.authService.signIn();
    }
}
