import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';;
import { UserStatsComponent } from './components/user-stats/user-stats.component'
import { UserContainerComponent } from './components/user-container/user-container.component'

import { Seconds2HoursPipe, Meter2KilometersPipe, PaceCalculatorPipe } from '../../pipes/unit.pipe';
import { UserPictureComponent } from './components/user-picture/user-picture.component'

@NgModule({
  imports:      [CommonModule],
  declarations: [UserStatsComponent,UserContainerComponent, UserPictureComponent],
  providers:    [],
  exports:      [UserContainerComponent] 
})
export class UserProfileModule { }