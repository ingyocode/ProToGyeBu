import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GetSportsQueryInterface, CreateSportsInterface } from './interfaces'
import { InjectRepository } from '@nestjs/typeorm';
import { GamesInterface, SportsEntity } from '@protogyebu/models';
import { Repository } from 'typeorm';
import Hashids from 'hashids';

@Injectable()
export class SportService {
  hashidsForCursor: Hashids;
  hashidsForUid: Hashids;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(SportsEntity)
    private readonly sportsRepository: Repository<SportsEntity>
  ) {
    if (this.hashidsForCursor === undefined) {
      this.hashidsForCursor = new Hashids(this.configService.get<string>('HASH_KEY'), 32, 'abcdefghijklmnopqrstuvwxyz1234567890');
    }

    if (this.hashidsForUid === undefined) {
      this.hashidsForUid = new Hashids(this.configService.get<string>('HASH_KEY'), 32, 'abcdefghijklmnopqrstuvwxyz1234567890');
    }
  }
  encodeId(id: number): string {
    return this.hashidsForUid.encode(id);
  }

  decodeUid(uid: string): number {
    return Number(this.hashidsForUid.decode(uid)[0]);
  }

  async getSports(param: GetSportsQueryInterface) {
    const httpUrl: string = this.configService.get<string>('SPORT_URL');
    const today: Date = new Date();
    const endDate: Date = new Date();
    endDate.setDate(endDate.getDate() + 2)
    const result = await firstValueFrom(
      // D도메인
      // this.httpService.get(httpUrl, {
      //   params: {
      //     page: 1,
      //     filter: 'importance',
      //     fromDate: param?.startDate ? param?.startDate : getFormatDate(today),
      //     toDate: param?.endDate ? param?.endDate : getFormatDate(endDate),
      //     pageSize: 100,
      //     detail: false,
      //     // leagueCode
      //   },
      //   maxBodyLength: Infinity
      // })
      // LS용
      this.httpService.get(httpUrl, {
        params: {
          // basket, baseball, volley, hockey
          // sports: 'mainScore'
          sports: 'basket',
          // date: '2023-04-27'
        }
      })
    )
    return result.data
  }

  async createGameForBetting(param: CreateSportsInterface[]): Promise<GamesInterface[]> {
    console.log(param)
    const sports = await this.sportsRepository.save({
      ...param
    })
    const sportsIds = []
    sports.forEach((sport) => {
      sport.uid = this.encodeId(sport.id)
      sportsIds.push(this.sportsRepository.update({ id: sport.id }, { uid: sport.uid }));
    });
    await Promise.all(sportsIds);
    return sports;
  }
}

function getFormatDate(date: Date) {
  let year = date.getFullYear();              //yyyy
  let month: number | string = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  let day: number | string = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}