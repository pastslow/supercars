import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Parking } from '@app/shared/interfaces/parking.interface';
import { HttpResponse } from '@app/shared/interfaces/http-response.interface';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';

import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingService } from '@app/shared/services/parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit, OnDestroy {
  public displayParkingZone: boolean;
  public parkings: Parking;
  public userId = 1;
  public selectedParking: Parking;
  public parkingData: ParkingData;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private parkingApiService: ParkingApiService,
    private parkingService: ParkingService,) { }

  public ngOnInit(): void {
    // 1 represents the userId
    this.parkingApiService.getParkings(1).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((response: HttpResponse) => {
      if (response) {
        this.parkings = response.parking;
      }
    })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public backToParkings(): void {
    this.displayParkingZone = false;
  }

  public getSelectedParking(parking: Parking): void {
    this.selectedParking = parking;

    this.parkingService.getParkingData$().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((parkingData: ParkingData) => {
      this.displayParkingZone = true;
      this.parkingData = parkingData;
    });
  }
}
