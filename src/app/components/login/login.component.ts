import { Component, OnInit } from '@angular/core';
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
  code:string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to null if no query param provided.
        this.code = params['code'] || null;
        if(this.code!=null){
          this.login(this.code);
        }
      });


  }

  login(code:string) {
    this.loading = true;
    this.authenticationService.login(code)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
