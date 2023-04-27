import { Controller, Get, Post, Put, UseGuards, Request, Body, HttpException, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BettingsService, JwtAuthGuard } from "@protogyebu/backend";
import { PostBettingsDto } from "./dtos";

@ApiTags('bettings')
@Controller('bettings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('token')
export class BettingsController {
    constructor(private readonly bettingsService: BettingsService) { }
    @Get()
    async getBettings(
        @Request() req
    ) {
        return await this.bettingsService.get(req.user.uid)
    }

    @Post()
    async create(
        @Request() req,
        @Body() body: PostBettingsDto
    ) {
        const userId = this.bettingsService.decodeUid(req.user.uid)
        if (Number.isNaN(userId)) {
            throw new HttpException("잘못된 토큰의 값입니다.", HttpStatus.BAD_REQUEST)
        }
        return await this.bettingsService.create({
            userId: userId,
            ...body
        })
    }

    @Put()
    update(
        @Request() req,
        @Body() body
    ) {
        console.log('')
    }

    @Post()
    delete(
        @Request() req
    ) {
        console.log('asdf')
    }
}