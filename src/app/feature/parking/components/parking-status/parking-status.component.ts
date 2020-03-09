import { Component, OnInit, Input } from '@angular/core';

import { ParkingService } from '@app/shared/services/parking.service';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.scss']
})
export class ParkingStatusComponent implements OnInit {
  public parkingData;

  @Input() public parking;

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.parkingData = this.parkingService.parkingData;
  }
}
