import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Activity} from '../models/activity.model';
import {Observable} from '../../../node_modules/rxjs';

@Injectable()
export class ActivityService {

  endpoint = 'https://mockactivities-jblcwvxsel.now.sh/';
  activities: Activity[];
  active: Activity;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    return this.http.get<Activity[]>(this.endpoint);
  }

  setActive(activity: Activity) {
    this.active = activity;
  }


   syncStravaActivities(): Observable<boolean> {
    console.log('syncing bla bla');
    return  Observable.of(true).delay(5000);
  }


}


