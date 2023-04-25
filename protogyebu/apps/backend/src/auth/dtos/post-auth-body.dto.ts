import { ApiProperty } from "@nestjs/swagger";
import { PostAuthBodyInterface } from "@protogyebu/backend";
import { IsEmail, IsString } from "class-validator";

export class PostAuthBodyDto implements PostAuthBodyInterface {
    @IsEmail()
    @ApiProperty({ description: '유저의 email' })
    email: string;

    @IsString()
    @ApiProperty({ description: '유저의 password' })
    password: string;
}