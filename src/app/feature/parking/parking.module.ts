import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingFloorsComponent } from '@app/feature/parking/components/parking-floors/parking-floors.component';
import { ParkingStatusComponent } from '@app/feature/parking/components/parking-status/parking-status.component';
import { ParkingStatusHeaderComponent } from '@app/feature/parking/components/parking-status-header/parking-status-header.component';
import { TerrainComponent } from '@app/feature/parking/components/terrain/terrain.component';
import { ParkingItemsComponent } from '@app/feature/parking/components/parking-items/parking-items.component';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingFacadeService } from '@app/feature/parking/services/parking-facade-service.service';
import { ParkingMapperService } from '@app/feature/parking/services/parking-mapper.service';
import { ParkingApiService } from '@app/feature/parking/services/parking-api-service';
import { ParkingCreationService } from '@app/feature/parking/services/parking-creation.service';
import { ParkingSelectedSpotService } from '@app/feature/parking/services/parking-selected-spot.service';
import { ParkingService } from '@app/feature/parking/services/parking.service';
import { CreateParkingAreaComponent } from '@app/feature/parking/components/create-parking-area/create-parking-area.component';
import { SelectedSpotModalComponent } from '@app/feature/parking/components/selected-spot-modal/selected-spot-modal.component';
import { UpdateLineSizeDirective } from '@app/feature/parking/directives/update-line-size.directive';
import { ParkingContainerComponent } from '@app/feature/parking/parking-container/parking-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { ParkingViewModeComponent } from './components/parking-view-mode/parking-view-mode.component';
import { ParkingEditSpotsComponent } from './components/parking-edit-spots/parking-edit-spots.component';
import { PreviewSlotPlacementDirective } from '@app/feature/parking/directives/preview-slot-placement.directive';

@NgModule({
  declarations: [
    ParkingFloorsComponent,
    ParkingStatusComponent,
    ParkingStatusHeaderComponent,
    TerrainComponent,
    ParkingContainerComponent,
    ParkingItemsComponent,
    CreateParkingAreaComponent,
    SelectedSpotModalComponent,
    UpdateLineSizeDirective,
    ParkingViewModeComponent,
    ParkingEditSpotsComponent,
    PreviewSlotPlacementDirective,
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    ParkingFacadeService,
    ParkingMapperService,
    ParkingService,
    ParkingSelectedSpotService,
    ParkingApiService,
    ParkingCreationService,
  ],
})
export class ParkingModule {}
