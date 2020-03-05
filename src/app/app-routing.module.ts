import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('@app/feature/parking/parking.module').then(m => m.ParkingModule),
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo:'admin/parking'
  },
  {
    path: '**',
    redirectTo: 'parking'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
