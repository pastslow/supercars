import { Component, OnInit } from '@angular/core';
import { SharedConstants } from '@app/shared/constants/shared-constants';
import { ParkingCreationService } from '@app/shared/services/parking-creation.service';

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

    constructor(private parkingCreationService: ParkingCreationService) {}

    public ngOnInit(): void {
        this.parkingModels = SharedConstants.defaultModels;
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
      const parkingName = this.parkingModels[this.selectedParkingModel].name;
      const parkingModel = SharedConstants.parkingModels.find(parking => parking.name === parkingName);

      this.parkingCreationService.createParking(parkingModel).subscribe();
    }
}
