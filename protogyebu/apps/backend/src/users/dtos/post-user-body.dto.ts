import { ApiProperty } from '@nestjs/swagger';
import { CreateUserInterface } from '@protogyebu/backend';
import { IsEmail, IsString } from 'class-validator';

export class PostUserBodyDto implements CreateUserInterface {
    @IsEmail()
    @ApiProperty({ description: '유저의 이메일' })
    email: string;

    @IsString()
    @ApiProperty({ description: '유저의 비밀번호' })
    password: string;

    @IsString()
    @ApiProperty({ description: '유저의 이름' })
    name: string;
}
