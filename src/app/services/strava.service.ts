import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Activity} from '../models/activity.model';
import {Observable} from 'rxjs';
import {ActivityStream} from '../models/activity-stream';





@Injectable()
export class StravaService {

  private activities: Activity[];

  constructor(
    private http: Http) {
  }


  // not very usefull since it is already done during authentication
  getUserActivities(): Observable<Activity[]> {

    if (this.activities) {
      return Observable.of<Activity[]>(this.activities);
    }

    // add authorization header with strava token
    const access_token = localStorage.getItem('stravaToken');
    const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
    const options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('https://www.strava.com/api/v3/athlete/activities', options)
      .map((response: Response) => response.json());
  }


  getActivityStream(activity: Activity): Observable<ActivityStream[]> {

    // add authorization header with strava token
    const access_token = localStorage.getItem('stravaToken');
    const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
    const options = new RequestOptions({ headers: headers });

    const id = activity.id;
    const types = 'latlng';

    return this.http.get('https://www.strava.com/api/v3/activities/' + id + '/streams/' + types, options)
      .map((response: Response) => response.json());
  }

}
