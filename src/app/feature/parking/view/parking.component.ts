import { Component, OnInit } from '@angular/core';

import { Parking } from '@app/shared/interfaces/parking.interface';
import { HttpResponse } from '@app/shared/interfaces/http-response.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-spot.interface';

import { SdkParkingService } from '@app/shared/services/sdk-parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  public displayParkingZone: boolean;
  public parkings: Parking;
  public userId = 1;
  public selectedParking: ParkingArea;

  constructor(private sdkParkingService: SdkParkingService) { }

  public ngOnInit(): void {
    this.sdkParkingService.getParkings(1).subscribe((response: HttpResponse) => {
      if (response) {
        this.parkings = response.parking;
      }
    })
  }

  public backToParkings(): void {
    this.displayParkingZone = false;
  }

  public getSelectedParking(parking): void {
    this.selectedParking = parking;
    this.displayParkingZone = true;
  }
}
