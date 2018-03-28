import { Component } from '@angular/core';
import { ActivityService } from '../../../../services/activity.service';
import { Activity } from '../../../../models/activity.model';
@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent {
  name = 'RunForStats';
  activities: Activity[];
  activityService: ActivityService;
  active: Activity;

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
    this.getAll();
  }


  getAll() {
    this.activityService.getAll().subscribe(result => {
      this.activities = result;
    });
  }

  setActive(activity: Activity) {
    if (this.active == activity) {
      this.active = null;
    } else {
      this.active = activity;
    }
  }

}
