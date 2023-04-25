import { ApiProperty } from "@nestjs/swagger";

export class PostAuthResponseDto {
    @ApiProperty({ description: 'jwt token' })
    token: string;
}