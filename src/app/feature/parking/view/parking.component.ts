import { Component, OnInit } from '@angular/core';

import { ParkingService } from '@app/shared/services/parking.service';
import { Parking } from '@app/shared/interfaces/parking.interface';
import { HttpResponse } from '@app/shared/interfaces/http-response.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-spot.interface';

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

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.parkingService.getParkings(1).subscribe((response: HttpResponse) => {
      if (response) {
        this.parkings = response.parking;
      }
    })
  }

  public backToParkings() {
    this.displayParkingZone = false;
  }

  public getSelectedParking(parking) {
    this.selectedParking = parking;
    this.displayParkingZone = true;
  }
}
