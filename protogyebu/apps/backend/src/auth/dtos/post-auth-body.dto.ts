import { PostAuthBodyInterface } from "@protogyebu/backend";
import { IsEmail, IsString } from "class-validator";

export class PostAuthBodyDto implements PostAuthBodyInterface {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}