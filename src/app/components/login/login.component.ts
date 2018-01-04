import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  success = '';
  code: string;
  logged;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();

    this.authenticationService.logged.subscribe(logged => {this.logged = logged});

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

  login(code: string) {
    this.loading = true;
    this.authenticationService.login(code)
      .subscribe(result => {
        console.log(result);

        this.success = JSON.stringify(result);
      }, error => {
        // login failed
        this.error = error;
        this.loading = false;

      });
  }

  connectToStrava() {
    var host = window.location.origin;
    var redirectUrl = "https://www.strava.com/oauth/authorize?client_id=18714&response_type=code&redirect_uri=" + host + "/login";
    window.location.href = redirectUrl;
  }


}
