import {NgModule} from '@angular/core';

// maincomponent
import {AppComponent} from './app.component';

// services
import {ActivityService} from './services/activity.service';


// modules
import {BrowserModule} from '@angular/platform-browser';
import {ActivityListModule} from './modules/activity-list/activity-list.module';
import {UserProfileModule} from './modules/user-profile/user-profile.module';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';

// pages
import {PageHomeComponent} from './components/pages/page-home/page-home.component';
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';

// components
import {FooterComponent} from './components/layout/footer/footer.component';
import {PageLoginComponent} from './components/pages/page-login/page-login.component';
import {AuthenticationService} from './modules/app-routing/services/app-routing/authentication.service';


@NgModule({
  imports: [BrowserModule,
    ActivityListModule,
    UserProfileModule,
    AppRoutingModule
  ],
  declarations: [AppComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    PageLoginComponent],
  bootstrap: [AppComponent],
  providers: [
    ActivityService,
    AuthenticationService
  ],

})

export class AppModule {
}
