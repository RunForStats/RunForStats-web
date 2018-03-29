import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../modules/app-routing/services/app-routing/authentication.service';



@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})

export class PageLoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  success = '';
  code: string;
  logged;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {


    this.authenticationService.logged.subscribe(logged => {
      this.logged = logged;
      this.onLogged(logged);
    });


    // when you navigate to the login page with the
    // query parameter "code", the page will attempt the login
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to null if no query param provided.
        this.code = params['code'] || null;
        if (this.code != null) {
          this.login(this.code);
        }
      });

  }

  ngOnInit() {
  }

  // makes call to the authentication service with
  // the code returned from strava
  login(code: string) {
    this.loading = true;
    this.authenticationService.login(code)
      .subscribe(result => {
        this.onLogged(true);
      }, error => {
        // login failed
        this.onLogged(false);
        console.log(error);
        this.error = error.error;
        this.loading = false;
      });
  }


  onLogged(isLogged: boolean) {
    if (isLogged) {
      this.success = 'SUCCESS';
    }
    else {
      this.success = null;
    }
  }


  // connect to strava endpoint
  connectToStrava() {
    var host = window.location.origin;
    var redirectUrl = 'https://www.strava.com/oauth/authorize?client_id=18714&response_type=code&redirect_uri=' + host + '/login';
    window.location.href = redirectUrl;
  }


}
