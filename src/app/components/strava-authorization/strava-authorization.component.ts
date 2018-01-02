import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'redirect',
  template: 'redirecting...'
})
export class StravaAuthorizationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.location.href = 'https://www.strava.com/oauth/authorize?client_id=18714&response_type=code&redirect_uri=http://api.runforstats.com/exchange&approval_prompt=force';
  }
}
