import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectedSpotModalComponent } from '@app/shared/components/selected-spot-modal/selected-spot-modal.component';
import { SpinnerModalComponent } from '@app/shared/components/spinner-modal/spinner-modal.component';

import { UpdateLineSizeDirective } from '@app/shared/directive/update-line-size.directive';

import { ParkingService } from '@app/shared/services/parking.service';
import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingSelectedSpotService } from './services/parking-selected-spot.service';

@NgModule({
  declarations: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent,
    SpinnerModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent,
    SpinnerModalComponent
  ],
  providers: [
    ParkingService,
    ParkingSelectedSpotService,
    ParkingApiService,
  ]
})
export class SharedModule { }
