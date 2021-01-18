import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectedSpotModalComponent } from '@app/shared/components/selected-spot-modal/selected-spot-modal.component';
import { SpinnerModalComponent } from '@app/shared/components/spinner-modal/spinner-modal.component';

import { UpdateLineSizeDirective } from '@app/shared/directive/update-line-size.directive';

import { ParkingService } from '@app/shared/services/parking.service';
import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingSelectedSpotService } from './services/parking-selected-spot.service';
import { CreateParkingAreaComponent } from './components/create-parking-area/create-parking-area.component';
import { ParkingCreationService } from './services/parking-creation.service';

@NgModule({
  declarations: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent,
    SpinnerModalComponent,
    CreateParkingAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UpdateLineSizeDirective,
    SelectedSpotModalComponent,
    SpinnerModalComponent,
    CreateParkingAreaComponent
  ],
  providers: [
    ParkingService,
    ParkingSelectedSpotService,
    ParkingApiService,
    ParkingCreationService,
  ]
})
export class SharedModule { }
