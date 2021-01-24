import { Component, OnInit, Input } from '@angular/core';

import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.scss'],
})
export class ParkingStatusComponent implements OnInit {
  @Input() public selectedParkingArea: ParkingArea;

  constructor() {}

  public ngOnInit(): void {}
}
