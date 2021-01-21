import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Parking } from '@app/shared/interfaces/parking.interface';

import { ParkingFacadeService } from '@app/feature/parking/services/parking-facade-service.service';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit, OnDestroy {
  public displayParkingZone: boolean;
  public parkings: Parking[];
  public selectedParking: Parking;
  public selectedParkingLevelIndex = 0;
  public selectedParkingArea: ParkingArea;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private parkingFacadeService: ParkingFacadeService) {}

  public ngOnInit(): void {
    this.listenToModelChanges();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public backToParkings(): void {
    this.displayParkingZone = false;

    this.getAllUserParkings();
  }

  private getAllUserParkings(): void {
    this.parkingFacadeService
      .getAllUserParkings()
      .pipe(takeUntil(this.unsubscribe$), take(1))
      .subscribe((response: Parking[]) => {
        if (response) {
          console.log('bbb');
          this.parkings = response;
        }
      });
  }

  private listenToModelChanges(): void {
    this.getAllUserParkings();

    this.parkingFacadeService
      .getParkingState$()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((parking: Parking) => {
          if (!parking) {
            return;
          }

          this.selectedParking = parking;
          this.selectedParkingArea = this.selectedParking.levels[
            this.selectedParkingLevelIndex
          ].areas;

          this.displayParkingZone = true;
          this.parkingFacadeService.updateParkingAreaState(
            this.selectedParkingArea
          );
        })
      )
      .subscribe();
  }
}
