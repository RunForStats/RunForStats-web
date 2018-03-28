import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../models/activity.model';

@Injectable()
export class ActivityService {

  endpoint: string = "https://mockactivities-jblcwvxsel.now.sh/";
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

}


