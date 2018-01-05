import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {

    this.authenticationService.logged.subscribe(logged => {
      if (logged) {
        this.user = this.authenticationService.currentUser
      }
    });
  }

  ngOnInit() {


  }

}
