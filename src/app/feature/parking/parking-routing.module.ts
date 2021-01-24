import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingContainerComponent } from '@app/feature/parking/parking-container/parking-container.component';

const routes: Routes = [
  {
    path: 'parking',
    component: ParkingContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingRoutingModule {}
