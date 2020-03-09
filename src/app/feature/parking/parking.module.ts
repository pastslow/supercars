import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingFloorsComponent } from '@app/feature/parking/components/parking-floors/parking-floors.component';
import { ParkingStatusComponent } from '@app/feature/parking/components/parking-status/parking-status.component';
import { ParkingStatusHeaderComponent } from '@app/feature/parking/components/parking-status-header/parking-status-header.component';
import { TerrainComponent } from '@app/feature/parking/components/terrain/terrain.component';
import { ParkingComponent } from '@app/feature/parking/view/parking.component';
import { ParkingItemsComponent } from '@app/feature/parking/components/parking-items/parking-items.component';

import { SharedModule } from '@app/shared/shared.module';
import { ParkingRoutingModule } from './parking-routing.module';

@NgModule({
  declarations: [
    ParkingFloorsComponent,
    ParkingStatusComponent,
    ParkingStatusHeaderComponent,
    TerrainComponent,
    ParkingComponent,
    ParkingItemsComponent
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    SharedModule
  ],
  exports: [
    ParkingComponent
  ],
})
export class ParkingModule { }
