import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ParkingModels } from '@app/feature/parking/constants/parking-models.constants';

@Component({
  selector: 'app-create-parking-area',
  templateUrl: './create-parking-area.component.html',
  styleUrls: ['./create-parking-area.component.scss'],
})
export class CreateParkingAreaComponent implements OnInit {
  public selectedParkingModel = 0;
  public isPreviousButtonDisabled = false;
  public isNextButtonDisabled = false;
  public parkingModels;
  @Output()
  public changeParkingModelIndex: EventEmitter<number> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {
    this.parkingModels = ParkingModels.defaultModels;
    this.initGalleryControls();
  }

  public initGalleryControls(): void {
    if (this.selectedParkingModel === 0) {
      this.isPreviousButtonDisabled = true;
      this.isNextButtonDisabled = false;
    } else if (this.selectedParkingModel === this.parkingModels.length - 1) {
      this.isPreviousButtonDisabled = false;
      this.isNextButtonDisabled = true;
    }
  }

  public nextParkingArea(): void {
    this.selectedParkingModel++;
    this.isPreviousButtonDisabled = false;

    this.initGalleryControls();
  }

  public previousParkingArea(): void {
    this.selectedParkingModel--;
    this.isNextButtonDisabled = false;
    this.initGalleryControls();
  }

  public createParking(): void {
    this.changeParkingModelIndex.next(this.selectedParkingModel);
  }
}
