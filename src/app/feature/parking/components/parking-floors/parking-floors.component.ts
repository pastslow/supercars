import { Component, OnInit, Input } from '@angular/core';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';

@Component({
  selector: 'app-parking-floors',
  templateUrl: './parking-floors.component.html',
  styleUrls: ['./parking-floors.component.scss']
})
export class ParkingFloorsComponent implements OnInit {
  @Input() public parking: Parking;
  @Input() public parkingData: ParkingData;

  constructor() { }

  public ngOnInit(): void { }
}
