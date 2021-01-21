import { Component, OnInit, Input } from '@angular/core';

import { Parking } from '@app/shared/interfaces/parking.interface';

@Component({
  selector: 'app-parking-floors',
  templateUrl: './parking-floors.component.html',
  styleUrls: ['./parking-floors.component.scss'],
})
export class ParkingFloorsComponent implements OnInit {
  @Input() public selectedParking: Parking;
  public selectedFloorNumber = 0;

  constructor() {}

  public ngOnInit(): void {}
}
