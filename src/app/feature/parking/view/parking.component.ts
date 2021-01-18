import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';

import { ParkingFacadeService } from '@app/feature/parking/services/parking-facade-service.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit, OnDestroy {
  public displayParkingZone: boolean;
  public parkings: Parking[];
  public selectedParking: Parking;
  public parkingData: ParkingData;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private parkingFacadeService: ParkingFacadeService) {}

  public ngOnInit(): void {
    this.getAllUserParkings();
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

    this.parkingFacadeService
      .getSelectedParking()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((parkingData: ParkingData) => {
        this.displayParkingZone = true;
        this.parkingData = parkingData;
      });
  }

  private getAllUserParkings(): void {
    this.parkingFacadeService
      .getAllUserParkings()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: Parking[]) => {
        if (response) {
          this.parkings = response;
        }
      });
  }
}
