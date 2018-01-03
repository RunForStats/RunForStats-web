import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('stravaToken')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    var redirectUrl = "https://www.strava.com/oauth/authorize?client_id=18714&response_type=code&redirect_uri=http://runforstats.com/login";
    window.location.href = redirectUrl;
    return false;
  }
}
