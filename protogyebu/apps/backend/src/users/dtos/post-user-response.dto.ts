import { ApiProperty } from "@nestjs/swagger";

export class PostUserResponseDto {
    @ApiProperty({ description: 'userId값의 hashing된 값' })
    uid: string;

    @ApiProperty({ description: 'user의 email 값' })
    email: string;

    @ApiProperty({ description: 'user의 이름' })
    name: string;
}