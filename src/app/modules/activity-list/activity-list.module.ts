import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';;


import { ActivityListComponent } from './components/activity-list/activity-list.component'
import { HttpClientModule } from '@angular/common/http';
import { Seconds2HoursPipe, Meter2KilometersPipe, PaceCalculatorPipe } from '../../pipes/unit.pipe'

@NgModule({
  imports:      [CommonModule, FormsModule, HttpClientModule],
  declarations: [Seconds2HoursPipe, Meter2KilometersPipe, PaceCalculatorPipe, ActivityListComponent],
  providers:    [],
  exports:      [ActivityListComponent] 
})
export class ActivityListModule { }
