import { Component, OnInit } from '@angular/core';

import { ParkingService } from '@app/shared/services/parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  public displayParkingZone: boolean;
  public parkings;
  public userId = 1;
  public selectedParking;

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.parkingService.getParkings(1).subscribe(response => {
      if (response) {
        this.parkings = response;
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
