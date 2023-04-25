import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {GameInterface} from '@protogyebu/backend'
import {DateTime} from 'luxon';

@Injectable()
export class SportService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    ) {}

  // public iamport = new Iamport({
  //   apiKey:'imp_apikey',
  //   apiSecret: 'ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f'
  // });
  // testing() {
  //   const getBanks = Banks.getBanks();
  //   getBanks.request(this.iamport).then(res => console.log(res.data)).catch(err => console.log(err.response.data))
  // }

  async getSports(): Promise<GameInterface[]> {
    const httpUrl: string = this.configService.get<string>('SPORT_URL');
    const today:Date = new Date();
    const endDate: Date = new Date();
    endDate.setDate(endDate.getDate()+2)
    const result = await firstValueFrom(
      this.httpService.get(httpUrl, {
        params: {
          page: 1,
          filter:'importance',
          fromDate: getFormatDate(today),
          toDate: getFormatDate(endDate),
          pageSize: 100,
          detail: false,
          // leagueCode
        },
        maxBodyLength: Infinity
      })
    )
    // if(result.status)
    console.log(result.data)
    return <GameInterface[]>result.data
  }
}
  
function getFormatDate(date: Date){
  let year = date.getFullYear();              //yyyy
  let month: number|string = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  let day:number|string = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}