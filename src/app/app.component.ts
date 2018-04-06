import {Component, ViewChild, ElementRef, OnInit, isDevMode} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from './modules/app-routing/services/app-routing/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  name = 'RunForStats';
  logged;
  title = 'app';
  isDev = false;

  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {

    // check if logged every time route is changed
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logged = this.authenticationService.isLogged();
      }
    });


  }


  ngOnInit(): void {

    this.isDev = isDevMode();

    this.authenticationService.logged.subscribe(logged => {
        this.logged = logged;
      }
    );

  }

  logout() {
    this.authenticationService.logout();
    const routeWithNoParams = this.router.url.toString().split('?')[0];
    this.router.navigate([routeWithNoParams], {preserveQueryParams: false});
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }


}
