import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import {GameInterface} from '@protogyebu/backend'
@Component({
  selector: 'protogyebu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.sports()
  }
  constructor(private readonly appService: AppService) {}

  dataSource:TableData[] = []
  pageSize: number = 0;
  displayedColumns: string[] = ['gameName', 'gameStatus', 'homeTeam', 'homePoint','awayPoint','awayTeam'];

  sports() {
    const data: TableData[] = []
    return this.appService.getSports().subscribe((res) => {
      res.list.forEach((game) => {
        data.push({
          gameName: game?.league?.leagueCode,
          gameStatus: game?.periodType,
          homeTeam: game?.home?.team?.nameMain,
          homePoint: game?.home?.result,
          homeWin: game?.home?.wlt,
          homeIcon: game?.home?.team?.imageUrl,
          awayTeam: game?.away?.team?.nameMain,
          awayPoint: game?.away?.result,
          awayIcon: game?.away?.team?.imageUrl,
          awayWin: game?.away?.wlt,
        })
        console.log(game?.home?.wlt)
      })
      this.dataSource = data;
      this.pageSize = res.pagingInfo.pageSize;
      console.log(res)
    })
  }
}

export interface ResponseData {
  list: GameInterface[]
  pagingInfo: {
    page: number;
    pageSize: number;
    totalCount: number;
  }
}
interface TableData {
  gameName: string;
  gameStatus: string;
  homeTeam: string;
  homeIcon: string;
  homeWin: string;
  homePoint: number;
  awayTeam: string;
  awayPoint: number;
  awayIcon: string;
  awayWin: string;
}