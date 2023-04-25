import { CreateUserInterface } from '@protogyebu/backend';
import { IsEmail, IsString } from 'class-validator';

export class PostUserBodyDto implements CreateUserInterface {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;
}
