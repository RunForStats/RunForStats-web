import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from "../models/user";


@Injectable()
export class UserService {
  constructor(
    private http: Http) {
  }


  // not very usefull since it is already done during authentication
  getCurrentUser(): Observable<User> {
    // add authorization header with strava token
    var access_token = localStorage.getItem('stravaToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('https://www.strava.com/api/v3/athlete', options)
      .map((response: Response) => response.json());
  }


}
