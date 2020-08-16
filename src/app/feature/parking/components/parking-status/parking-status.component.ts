import { Component, OnInit } from '@angular/core';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { ParkingAreaStatus } from '@app/shared/interfaces/parking-area-status.interface';

import { ParkingService } from '@app/shared/services/parking.service';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.scss']
})
export class ParkingStatusComponent implements OnInit {
  public parkingData: ParkingData;
  public parkingAreaStatus: ParkingAreaStatus;

  constructor(private parkingService: ParkingService) { }

  public ngOnInit(): void {
    this.parkingAreaStatus = this.parkingService.parkingAreaStatus;
    this.parkingData = this.parkingService.parkingData;
  }
}
