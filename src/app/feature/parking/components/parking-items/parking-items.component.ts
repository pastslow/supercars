import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ParkingLogicService } from '@app/shared/services/parking-logic.service';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { HttpResponse } from '@app/shared/interfaces/http-response.interface';

@Component({
  selector: 'app-parking-items',
  templateUrl: './parking-items.component.html',
  styleUrls: ['./parking-items.component.scss']
})
export class ParkingItemsComponent implements OnInit {
  @Input() public adminParkings;
  @Output() public getSelectedParking = new EventEmitter();

  constructor(private parkingService: ParkingLogicService) { }

  ngOnInit(): void {
  }

  public editSelectedParking(selectedParking) {
    return of(true).pipe(
      mergeMap(() => {
        return this.parkingService.getSelectedParkingEntries(selectedParking.id).pipe(map((response: HttpResponse) => {
          console.log('parking', response);
          const parking: HttpResponse = {};
          parking.levels = response.entries;
          return parking;
        }))
      }),
      mergeMap((parking) => {
        for (const level of parking.levels) {
          return this.parkingService.getSelectedParkingAreas(level.id).pipe(map((response: HttpResponse) => {
            console.log('areas', response);
            level.areas = response.areas;
            return parking;
          }))
        }
      }),
      mergeMap((parking) => {
        for (const level of parking.levels) {
          for (const area of level.areas) {
            return this.parkingService.getAreaParkingSlots(area.id).pipe(map((response: HttpResponse) => {
              area.spots = response.spots;
              return parking;
            }))
          }
        }
      })
    ).subscribe(res => {
      selectedParking.levels = res.levels;
      this.getSelectedParking.emit(selectedParking);
    })
  }

}
