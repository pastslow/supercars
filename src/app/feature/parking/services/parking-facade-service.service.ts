import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingLevel } from '@app/shared/interfaces/parking-level.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingSlotStatus } from '@app/shared/enums/parking-slot-status.enum';
import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';

import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { SessionService } from '@app/core/services/session.service';
import { ParkingService } from '@app/shared/services/parking.service';

@Injectable()
export class ParkingFacadeService {
  constructor(
    private parkingApiService: ParkingApiService,
    private sessionService: SessionService,
    private parkingService: ParkingService
  ) {}

  public getParkingState$(): Observable<Parking> {
    return this.parkingService.getParkingState$();
  }

  public updateParkingState(parking: Parking): void {
    this.parkingService.updateParkingState(parking);
  }

  public getParkingAreaState$(): Observable<ParkingArea> {
    return this.parkingService.getParkingAreaState$();
  }

  public updateParkingAreaState(parkingArea: ParkingArea): void {
    this.parkingService.updateParkingAreaState(parkingArea);
  }

  public mapToParkingStatus(parkingStatus) {
    return {
      id: parkingStatus.id,
      totalSpots: parkingStatus.totalSpots,
      usedSpots: parkingStatus.usedSpots,
      freeSpots: parkingStatus.freeSpots,
    };
  }

  public getAllUserParkings(): Observable<Parking[]> {
    return this.sessionService.getUserId$().pipe(
      mergeMap((userId: number) => {
        // todo remove this when authentication is implemented
        if (!userId) {
          userId = 1;
        }
        // todo end
        return this.parkingApiService.getParkings(userId);
      })
    );
  }

  public getSelectedParkingLevelIndex$(): Observable<number> {
    return this.parkingService.getSelectedParkingLevelIndex$();
  }

  public updateSelectedParkingLevelIndex(levelIndex: number): void {
    this.parkingService.updateSelectedParkingLevelIndex(levelIndex);
  }

  public getSelectedParkingLevels(
    selectedParking: Parking
  ): Observable<ParkingLevel[]> {
    return this.parkingApiService
      .getSelectedParkingEntries(selectedParking.id)
      .pipe(
        map((results: ParkingLevel[]) => {
          return results;
        })
      );
  }

  public changeSlotStatus(
    selectedSpot: Spot,
    isSlotActive: number,
    driver: ParkingDriver
  ): Observable<void> {
    return this.parkingApiService
      .changeSlotStatus(selectedSpot.id, isSlotActive)
      .pipe(
        mergeMap(() => {
          if (isSlotActive === ParkingSlotStatus.active) {
            return this.addDriverToSelectedSpot(driver);
          }

          return of(true);
        }),
        mergeMap(() => {
          if (isSlotActive === ParkingSlotStatus.inactive) {
            return this.removeDriverFromSelectedSpot(selectedSpot.id);
          }

          return of(true);
        }),
        map(() => {
          selectedSpot.active = isSlotActive;
        })
      );
  }

  private addDriverToSelectedSpot(slotDriver): Observable<any> {
    let parking = this.parkingService.getParkingStateValue();
    let parkingAreaStatus = this.parkingService.getParkingAreaStateValue();
    parking = this.calculateParkingSpotsStatusAtCheckIn(parking);
    parkingAreaStatus = this.calculateParkingSpotsStatusAtCheckIn(
      parkingAreaStatus
    );

    const slotInfo = {
      driver: slotDriver,
      parkingStatus: this.mapToParkingStatus(parking),
      parkingAreaStatus: this.mapToParkingStatus(parkingAreaStatus),
    };

    return this.parkingApiService.addDriverToSelectedSpot(slotInfo);
  }

  private removeDriverFromSelectedSpot(selectedSpotId): Observable<any> {
    let parking = this.parkingService.getParkingStateValue();
    let parkingAreaStatus = this.parkingService.getParkingAreaStateValue();
    parking = this.calculateParkingSpotsStatusAtCheckOut(parking);
    parkingAreaStatus = this.calculateParkingSpotsStatusAtCheckOut(
      parkingAreaStatus
    );

    const slotInfo = {
      spotId: selectedSpotId,
      parkingStatus: this.mapToParkingStatus(parking),
      parkingAreaStatus: this.mapToParkingStatus(parkingAreaStatus),
    };

    return this.parkingApiService.deleteDriver(slotInfo);
  }

  private calculateParkingSpotsStatusAtCheckIn(parkingStatus) {
    if (parkingStatus.freeSpots - 1 < 0) {
      parkingStatus.freeSpots = 0;
    } else {
      parkingStatus.freeSpots--;
    }

    parkingStatus.usedSpots++;

    return parkingStatus;
  }

  private calculateParkingSpotsStatusAtCheckOut(parkingStatus) {
    parkingStatus.freeSpots++;
    parkingStatus.usedSpots--;

    return parkingStatus;
  }
}
