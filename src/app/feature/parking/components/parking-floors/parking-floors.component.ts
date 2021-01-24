import { Component, OnInit, Input } from '@angular/core';

import { Parking } from '@app/feature/parking/interfaces/parking.interface';

@Component({
  selector: 'app-parking-floors',
  templateUrl: './parking-floors.component.html',
  styleUrls: ['./parking-floors.component.scss'],
})
export class ParkingFloorsComponent implements OnInit {
  @Input() public selectedParking: Parking;
  @Input() selectedParkingLevelIndex: number;

  constructor() {}

  public ngOnInit(): void {}
}
