import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivityService } from './services/activity.service';
import { Activity } from './models/activity.model';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'RunForStats';

  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  constructor() {
  }


  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }



}
