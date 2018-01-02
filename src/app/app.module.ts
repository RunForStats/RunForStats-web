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

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";
import {BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {fakeBackendProvider} from "./services/fakebackendFactory";
import {AuthGuard} from "./app-routing/AuthGuard";
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import { StravaAuthorizationComponent } from './components/strava-authorization/strava-authorization.component';




@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    MapComponent,
    DashboardComponent,
    LoginComponent,
    StravaAuthorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
