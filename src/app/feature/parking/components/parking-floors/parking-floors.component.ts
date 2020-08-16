import { Component, OnInit, Input } from '@angular/core';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';

import { ParkingService } from '@app/shared/services/parking.service';

@Component({
  selector: 'app-parking-floors',
  templateUrl: './parking-floors.component.html',
  styleUrls: ['./parking-floors.component.scss']
})
export class ParkingFloorsComponent implements OnInit {
  public parkingData: ParkingData;

  @Input() public parking;

  constructor(private parkingService: ParkingService) { }

  public ngOnInit(): void {
    this.parkingData = this.parkingService.parkingData;
  }
}
