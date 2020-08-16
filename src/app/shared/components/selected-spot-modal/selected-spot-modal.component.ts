import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-spot.interface';

import { ParkingService } from '@app/shared/services/parking.service';
import { SdkParkingService } from '@app/shared/services/sdk-parking.service';

@Component({
  selector: 'app-selected-spot-modal',
  templateUrl: './selected-spot-modal.component.html',
  styleUrls: ['./selected-spot-modal.component.scss']
})
export class SelectedSpotModalComponent implements OnInit {
  @Input() public selectedSpot: Spot;
  @Input() public selectedArea: ParkingArea;
  @Input() public driver;

  constructor(
    private parkingService: ParkingService,
    private sdkParkingService: SdkParkingService) { }

  public ngOnInit(): void {
  }

  public changeSlotStatus(active: boolean): void {
    const isSlotActive = active ? 1 : 0;

    this.sdkParkingService.changeSlotStatus(this.selectedSpot.id, isSlotActive).subscribe((res) => {
      if (res) {
        this.selectedSpot.active = isSlotActive;
        this.parkingService.getSelectedAreaSpotsByStatus(this.selectedArea);
      }
    })
  }

  public calculateDriverTimeSpend() {
    if(!this.driver) {
      return 0
    }

    const currentDay = moment();
    const startDay = moment(this.driver.check_in);
    const duration = moment.duration(currentDay.diff(startDay));

    return duration.hours();
  }
}
