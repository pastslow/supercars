import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedSpotModalComponent } from '@app/shared/components/selected-spot-modal/selected-spot-modal.component';
import { SpinnerModalComponent } from './components/spinner-modal/spinner-modal.component';

import { UpdateLineSizeDirective } from '@app/shared/directive/update-line-size.directive';

import { ParkingService } from '@app/shared/services/parking.service';
import { SdkParkingService } from './services/sdk-parking.service';

@NgModule({
  declarations: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent,
    SpinnerModalComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent,
    SpinnerModalComponent
  ],
  providers: [
    ParkingService,
    SdkParkingService,
  ]
})
export class SharedModule { }
