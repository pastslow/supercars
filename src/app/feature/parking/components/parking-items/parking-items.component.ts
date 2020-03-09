import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpResponse } from '@app/shared/interfaces/http-response.interface';

import { ParkingService } from '@app/shared/services/parking.service';
import { SpinnerService } from '@app/shared/services/spinner-service';

@Component({
  selector: 'app-parking-items',
  templateUrl: './parking-items.component.html',
  styleUrls: ['./parking-items.component.scss']
})
export class ParkingItemsComponent implements OnInit {
  @Input() public parkings;
  @Output() public getSelectedParking = new EventEmitter();

  constructor(
    private parkingService: ParkingService,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

  public editSelectedParking(selectedParking) {
    this.spinnerService.makeSpinnerVisible();

    return of(true).pipe(
      mergeMap(() => {
        return this.parkingService.getSelectedParkingEntries(selectedParking.id).pipe(map((response: HttpResponse) => {
          const parking: HttpResponse = {};
          parking.levels = response.entries;
          return parking;
        }))
      }),
      mergeMap((parking) => {
        for (const level of parking.levels) {
          return this.parkingService.getSelectedParkingAreas(level.id).pipe(map((response: HttpResponse) => {
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
      this.spinnerService.hideSpinner();
    })
  }
}
