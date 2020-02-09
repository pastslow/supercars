import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoverSelectedAreaDirective } from './directive/hover-selected-area.directive';
import { ParkingLogicService } from './services/parking-logic.service';
import { UpdateLineSizeDirective } from './directive/update-line-size.directive';


@NgModule({
  declarations: [
    HoverSelectedAreaDirective,
    UpdateLineSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UpdateLineSizeDirective
  ],
  providers: [
    ParkingLogicService
  ]
})
export class SharedModule { }
