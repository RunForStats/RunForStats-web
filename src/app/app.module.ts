import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from "./app-routing/app-routing.module";


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MapComponent } from './components/map/map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";
import {AuthGuard} from "./app-routing/AuthGuard";
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {GeocodingService} from "./services/geocoding.service";
import {MapService} from "./services/map.service";
import {StravaService} from "./services/strava.service";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    MapComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    StravaService,
    MapService,
    GeocodingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
