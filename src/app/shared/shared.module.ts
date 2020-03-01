import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingLogicService } from './services/parking-logic.service';
import { UpdateLineSizeDirective } from './directive/update-line-size.directive';
import { SelectedSpotModalComponent } from './components/selected-spot-modal/selected-spot-modal.component';

@NgModule({
  declarations: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent
  ],
  providers: [
    ParkingLogicService
  ]
})
export class SharedModule { }
