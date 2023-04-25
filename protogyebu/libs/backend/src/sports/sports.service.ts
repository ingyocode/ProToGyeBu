import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { GameInterface } from '../interfaces'
import { GetSportsQueryInterface } from './interfaces'

@Injectable()
export class SportService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }
  async getSports(param: GetSportsQueryInterface): Promise<GameInterface[]> {
    const httpUrl: string = this.configService.get<string>('SPORT_URL');
    const today: Date = new Date();
    const endDate: Date = new Date();
    endDate.setDate(endDate.getDate() + 2)
    const result = await firstValueFrom(
      this.httpService.get(httpUrl, {
        params: {
          page: 1,
          filter: 'importance',
          fromDate: param?.startDate ? param?.startDate : getFormatDate(today),
          toDate: param?.endDate ? param?.endDate : getFormatDate(endDate),
          pageSize: 100,
          detail: false,
          // leagueCode
        },
        maxBodyLength: Infinity
      })
    )
    console.log(result.data)
    return <GameInterface[]>result.data
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