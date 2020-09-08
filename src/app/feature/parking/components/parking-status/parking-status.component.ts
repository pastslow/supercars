import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { takeUntil, map, mergeMap, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { ParkingAreaStatus } from '@app/shared/interfaces/parking-area-status.interface';

import { ParkingService } from '@app/shared/services/parking.service';
import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { Parking } from '@app/shared/interfaces/parking.interface';

@Component({
  selector: 'app-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.scss']
})
export class ParkingStatusComponent implements OnInit, OnDestroy {
  public parkingAreaStatus: ParkingAreaStatus;
  @Input() public parkingData: ParkingData;
  @Input() public parkings: Parking[];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private parkingService: ParkingService, private parkingApiService: ParkingApiService) { }

  public ngOnInit(): void {
    this.parkingService.getParkingAreaStatus$().pipe(
      takeUntil(this.unsubscribe$),
      map((parkingAreaStatus: ParkingAreaStatus) => {
        this.parkingAreaStatus = parkingAreaStatus;
        return parkingAreaStatus;
      }),
      tap(() => {
        if (this.parkingAreaStatus.parkingId) {
          const selectedParking = this.parkings.find(parking => parking.id === this.parkingAreaStatus.parkingId);
          selectedParking.total_spots = this.parkingAreaStatus.totalSpots;
          selectedParking.free_spots = this.parkingAreaStatus.unusedSpots;
          selectedParking.used_spots = this.parkingAreaStatus.usedSpots;
        }
      }),
      mergeMap((parkingAreaStatus: ParkingAreaStatus) => {
        if (parkingAreaStatus && !parkingAreaStatus.parkingId) {
          return of(parkingAreaStatus)
        }

        return this.parkingApiService.updateParkingSpotsNumbers(parkingAreaStatus.parkingId,
          parkingAreaStatus.totalSpots, parkingAreaStatus.unusedSpots, parkingAreaStatus.usedSpots);
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
