import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

import { ParkingService } from '@app/shared/services/parking.service';
@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.scss']
})
export class ParkingStatusComponent implements OnInit {
  public parkingData;
  public selectedArea;
  public selectedFloor;

  public parkingAreaStatus;

  @Input() public parking;

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.parkingAreaStatus = this.parkingService.parkingAreaStatus;
    this.parkingData = this.parkingService.parkingData;
    this.selectedArea = _.find(this.parking.levels, (level) => {
      let selectedFloor;

      if (level.name === this.parkingData.selectedFloor) {
        selectedFloor = level
      }

      const selectedArea = _.find(selectedFloor.areas, area => area.name === this.parkingData.selectedArea)

      return selectedArea;
    })

    this.selectedFloor = _.find(this.parking.levels,
      level => level.name === this.parkingData.selectedFloor);

    this.selectedArea = _.find(this.selectedFloor.areas,
      area => area.name === this.parkingData.selectedArea);
  }

}
