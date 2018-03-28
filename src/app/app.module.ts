import { NgModule } from '@angular/core';

// maincomponent
import { AppComponent } from './app.component';

// services
import { ActivityService } from './services/activity.service';


// modules
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ActivityListModule } from './modules/activity-list/activity-list.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';

import {HttpModule} from '@angular/http';

// pages
import { PageHomeComponent } from './components/pages/page-home/page-home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { PageHeatmapComponent } from './modules/heatmap/components/page-heatmap/page-heatmap.component';
// components
import { FooterComponent } from './components/layout/footer/footer.component';


// routes
const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: 'heatmap', loadChildren: './modules/heatmap/heatmap.module#HeatmapModule'},
 // { path: 'heatmap', component: PageHeatmapComponent},
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [BrowserModule,
    ActivityListModule,
    UserProfileModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    //  ,{ enableTracing: true } // <-- debugging purposes only
    )],
  declarations: [AppComponent, PageHomeComponent, PageNotFoundComponent, FooterComponent],
  bootstrap: [AppComponent],
  providers: [ActivityService],

})

export class AppModule { }
