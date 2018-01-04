import {Component, isDevMode, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isDev = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isDev = isDevMode();


    // check if logged every time route is changed
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.authenticationService.isLogged();
      }
    });

  }


}
