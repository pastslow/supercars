import { Component, OnInit, Input } from '@angular/core';

import { Spot } from '@app/shared/interfaces/spot.interface';

import { ParkingService } from '@app/shared/services/parking.service';

@Component({
  selector: 'app-selected-spot-modal',
  templateUrl: './selected-spot-modal.component.html',
  styleUrls: ['./selected-spot-modal.component.scss']
})
export class SelectedSpotModalComponent implements OnInit {
  @Input() public selectedSpot: Spot;

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
  }

  public changeSlotStatus(active: boolean): void {
    const isSlotActive = active ? 1 : 0;
    this.parkingService.changeSlotStatus(this.selectedSpot.id, isSlotActive).subscribe((res) => {
      if (res) {
        this.selectedSpot.active = active;
      }
    })
  }

}
