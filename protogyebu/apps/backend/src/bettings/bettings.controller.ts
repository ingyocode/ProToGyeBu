import { Controller, Get, Post, Put, UseGuards, Request, Body, HttpException, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BettingsService, JwtAuthGuard } from "@protogyebu/backend";
import { PostBettingsDto } from "./dtos";

@ApiTags('bettings')
@Controller('bettings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BettingsController {
    constructor(private readonly bettingsService: BettingsService) { }
    @Get()
    async getBettings(
        @Request() req
    ) {
        return await this.bettingsService.get(req.user.uid)
    }

    @ApiOperation({
        summary: '내역 생성'
    })
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

    @ApiOperation({
        summary: '내역 수정'
    })
    @Put()
    update(
        @Request() req,
        @Body() body
    ) {
        return '만드는 중'
    }

    @ApiOperation({
        summary: '내역 삭제'
    })
    @Post('delete')
    delete(
        @Request() req
    ) {
        return '만드는 중'
    }
}