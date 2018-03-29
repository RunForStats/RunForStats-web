import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './services/map.service';


import { PageHeatmapComponent } from './components/page-heatmap/page-heatmap.component'


import { Routes, RouterModule } from '@angular/router';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const routes: Routes = [
    { path: '', component: HeatmapComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeafletModule.forRoot()
  ],
  declarations: [
    PageHeatmapComponent,
    HeatmapComponent
  ],
  providers: [ MapService ],
  exports: [ RouterModule ]
})
export class HeatmapModule { }
