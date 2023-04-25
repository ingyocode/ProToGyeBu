import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {GameInterface, ResponseData} from '@protogyebu/backend'
@Injectable()
export class AppService {
    constructor(private http: HttpClient) {}

    getSports(): Observable<ResponseData> {
        console.log('qwersfs')
        return this.http.get<ResponseData>("http://localhost:3000/api/sports")
    }
}