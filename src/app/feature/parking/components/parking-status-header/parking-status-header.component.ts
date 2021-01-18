import { Component, OnInit, Input } from '@angular/core';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';

@Component({
  selector: 'app-parking-status-header',
  templateUrl: './parking-status-header.component.html',
  styleUrls: ['./parking-status-header.component.scss'],
})
export class ParkingStatusHeaderComponent implements OnInit {
  @Input() public parking: ParkingData;

  constructor() {}

  public ngOnInit(): void {}
}
