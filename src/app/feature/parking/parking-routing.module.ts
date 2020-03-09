import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingComponent } from '@app/feature/parking/view/parking.component';

const routes: Routes = [
  {
    path: 'parking',
    component: ParkingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
