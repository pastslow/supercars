import { Component, OnInit, Input } from '@angular/core';

import { Parking } from '@app/shared/interfaces/parking.interface';

@Component({
  selector: 'app-parking-status-header',
  templateUrl: './parking-status-header.component.html',
  styleUrls: ['./parking-status-header.component.scss'],
})
export class ParkingStatusHeaderComponent implements OnInit {
  @Input() public selectedParking: Parking;

  constructor() {}

  public ngOnInit(): void {}
}
