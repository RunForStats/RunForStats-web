import { Injectable } from '@angular/core';
import {Router, CanActivate, NavigationStart, NavigationEnd} from '@angular/router';
import {AuthenticationService} from './services/app-routing/authentication.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate() {
    if (this.authenticationService.isLogged()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);

    return false;
  }
}
