import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../../../services/activity.service';

@Component({
  selector: 'app-activity-sync',
  templateUrl: './activity-sync.component.html',
  styleUrls: ['./activity-sync.component.css']
})
export class ActivitySyncComponent implements OnInit {

  private syncStatus = 'Last synchronization: 01/01/2018';

  constructor(private activityService: ActivityService) {
  }

  ngOnInit() {
  }

  syncStravaActivities() {
    this.syncStatus = 'Synchronizing';
    this.activityService.syncStravaActivities().subscribe(synced => {
      if (synced) {
        this.syncStatus = 'Synchronized';
      } else {
        this.syncStatus = 'Error in synchronization';
      }
    });

  }

}
