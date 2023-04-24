import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

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

  async getSports() {
    const httpUrl: string = this.configService.get<string>('SPORT_URL');
    const result = await firstValueFrom(
      this.httpService.get(httpUrl, {
        params: {
          page: 1,
          filter:'importance',
          fromDate: 20230424,
          toDate: 20230424,
          pageSize: 100,
          detail: false,
          // leagueCode
        },
        maxBodyLength: Infinity
      })
    )
    // if(result.status)
    console.log(result.data)
    return result.data
  }
}
  