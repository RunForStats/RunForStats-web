import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../components/pages/page-not-found/page-not-found.component';
import {PageHomeComponent} from '../../components/pages/page-home/page-home.component';
import {AuthGuard} from './auth-guard';
import {AuthenticationService} from './services/app-routing/authentication.service';
import {HttpModule} from '@angular/http';
import {PageLoginComponent} from '../../components/pages/page-login/page-login.component';


//
// const appRoutes: Routes = [
//
//   {
//     path: 'login',
//     data: {title: 'Login'},
//     component: LoginComponent
//   },
//   {
//     path: '',
//     redirectTo: '/home',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home',
//     component: HomeComponent,
//     data: {title: 'Home'}
//   },
//   {
//     path: 'map',
//     component: MapComponent,
//     data: {title: 'Map'},
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     data: {title: 'Dashboard'},
//     canActivate: [AuthGuard]
//
//   },
//
//   {path: '**', component: PageNotFoundComponent}
// ];

// routes
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: PageHomeComponent
  },
  {
    path: 'login',
    data: {title: 'Login'},
    component: PageLoginComponent
  },
  {
    path: 'heatmap',
    data: {title: 'Heatmap'},
    loadChildren: '../heatmap/heatmap.module#HeatmapModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    RouterModule.forRoot(
      appRoutes
      //,{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    AuthenticationService
  ]
})
export class AppRoutingModule {
}
