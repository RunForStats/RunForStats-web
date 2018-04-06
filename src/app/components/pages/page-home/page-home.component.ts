import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../modules/app-routing/services/app-routing/authentication.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  name = 'RunForStats';
  logged;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {


    // check if logged every time route is changed
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logged = this.authenticationService.isLogged();
        console.log('is logged: ' + this.authenticationService.isLogged());
      }
    });


  }

  ngOnInit() {

    console.log("oninit");

    this.authenticationService.logged.subscribe(logged => {
        this.logged = logged;
        console.log('is logged: ' + this.logged);
      }
    );




  }
}
