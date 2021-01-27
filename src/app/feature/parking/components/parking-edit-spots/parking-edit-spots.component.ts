import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ParkingModels } from '@app/feature/parking/constants/parking-models.constants';
import { SlotModel } from '@app/feature/parking/interfaces/slot-model.interface';

@Component({
  selector: 'app-parking-edit-spots',
  templateUrl: './parking-edit-spots.component.html',
  styleUrls: ['./parking-edit-spots.component.scss'],
})
export class ParkingEditSpotsComponent implements OnInit {
  @Output()
  public emitSelectedSpotModel: EventEmitter<SlotModel> = new EventEmitter();

  public selectedSpotModelIndex: number;
  public slotModels: SlotModel[];
  public isEraseModeEnabled: boolean;
  constructor() {}

  public ngOnInit(): void {
    this.slotModels = ParkingModels.slotsModels;
  }

  public changeSelectedSpotModel(
    spotIndex: number,
    spotModel: SlotModel
  ): void {
    this.isEraseModeEnabled = false;
    this.selectedSpotModelIndex = spotIndex;
    this.emitSelectedSpotModel.next(spotModel);
  }

  public toogleEraseMode(): void {
    const eraserSlotIndex = 0;
    this.isEraseModeEnabled = !this.isEraseModeEnabled;
    this.selectedSpotModelIndex = null;
    this.emitSelectedSpotModel.next(this.slotModels[eraserSlotIndex]);
  }
}
