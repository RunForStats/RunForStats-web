import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "../components/page-not-found/page-not-found.component";
import {HomeComponent} from "../components/home/home.component";
import {MapComponent} from "../components/map/map.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {AuthGuard} from "./AuthGuard";
import {LoginComponent} from "../components/login/login.component";



const appRoutes: Routes = [

  { path: 'login', component: LoginComponent},
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'map',
    component: MapComponent,
    data: { title: 'Map' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard',},
    canActivate: [AuthGuard]

  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
      //,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
