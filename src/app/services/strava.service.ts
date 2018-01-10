import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Activity} from "../models/activity";




@Injectable()
export class StravaService {

  private activities: Activity[];

  constructor(
    private http: Http) {
  }


  // not very usefull since it is already done during authentication
  getUserActivities(): Observable<Activity[]> {

    if(this.activities){
      return Observable.of<Activity[]>(this.activities);
    }

    // add authorization header with strava token
    var access_token = localStorage.getItem('stravaToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('https://www.strava.com/api/v3/athlete/activities', options)
      .map((response: Response) => response.json());
  }

}
