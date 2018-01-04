import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged;

  constructor( private authenticationService:AuthenticationService,
                private router: Router,
               private route:ActivatedRoute) { }

  ngOnInit() {

    this.authenticationService.logged.subscribe(logged => { this.logged = logged } );

  }

  logout(){
    this.authenticationService.logout();
    var routeWithNoParams =  this.router.url.toString().split('?')[0];
    this.router.navigate([routeWithNoParams], {preserveQueryParams: false} );
  }

}
