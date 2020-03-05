import { Component, OnInit, Input } from '@angular/core';

import { Spot } from '../../interfaces/spot.interface';
import { ParkingLogicService } from '@app/shared/services/parking-logic.service';

@Component({
  selector: 'app-selected-spot-modal',
  templateUrl: './selected-spot-modal.component.html',
  styleUrls: ['./selected-spot-modal.component.scss']
})
export class SelectedSpotModalComponent implements OnInit {
  @Input() public selectedSpot: Spot;

  constructor(private parkingService: ParkingLogicService) { }

  ngOnInit(): void {
  }


  public changeSlotStatus(active: boolean) {
    const isSlotActive = active ? 1 : 0;
    this.parkingService.changeSlotStatus(this.selectedSpot.id, isSlotActive).subscribe((res) => {
      if (res) {
        this.selectedSpot.active = active;
      }
    })
  }

}
