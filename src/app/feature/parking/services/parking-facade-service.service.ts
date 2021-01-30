import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { Parking } from '@app/feature/parking/interfaces/parking.interface';
import { ParkingLevel } from '@app/feature/parking/interfaces/parking-level.interface';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { Spot } from '@app/feature/parking/interfaces/spot.interface';
import { ParkingSlotStatus } from '@app/feature/parking/enums/parking-slot-status.enum';
import { ParkingDriver } from '@app/feature/parking/interfaces/parking-driver.interface';

import { ParkingApiService } from '@app/feature/parking/services/parking-api-service';
import { SessionService } from '@app/core/services/session.service';
import { ParkingService } from '@app/feature/parking/services/parking.service';

@Injectable()
export class ParkingFacadeService {
  constructor(
    private parkingApiService: ParkingApiService,
    private sessionService: SessionService,
    private parkingService: ParkingService
  ) {}

  public updateTemporaryAreaSpotsState(spots: Spot[]): void {
    return this.parkingService.updateTemporaryAreaSpotsState(spots);
  }

  public getTemporaryAreaSpotsStateValue(): Spot[] {
    return this.parkingService.getTemporaryAreaSpotsStateValue();
  }

  public getParkingState$(): Observable<Parking> {
    return this.parkingService.getParkingState$();
  }

  public getParkingStateValue(): Parking {
    return this.parkingService.getParkingStateValue();
  }

  public updateParkingState(parking: Parking): void {
    this.parkingService.updateParkingState(parking);
  }

  public getParkingAreaState$(): Observable<ParkingArea> {
    return this.parkingService.getParkingAreaState$();
  }

  public getParkingAreaStateValue(): ParkingArea {
    return this.parkingService.getParkingAreaStateValue();
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
  ): Observable<boolean> {
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
        tap(() => {
          selectedSpot.active = isSlotActive;
        })
      );
  }

  public deleteSelectedParking(id: string): Observable<any> {
    return this.parkingApiService.deleteSelectedParking({
      parkingId: id,
    });
  }

  public saveAreaChanges() {
    const selectedParkingArea = this.getParkingAreaStateValue();
    const temporaryAreaSpots = this.parkingService.getTemporaryAreaSpotsStateValue();

    const newParkingArea = Object.assign({}, selectedParkingArea);
    newParkingArea.spots = temporaryAreaSpots;

    return this.parkingApiService.addParkingSpots(newParkingArea).pipe(
      map((spots: Spot[]) => {
        selectedParkingArea.spots = [...spots];
        this.updateParkingAreaState(selectedParkingArea);
        return spots;
      })
    );
  }

  public createParking(parking: Parking): Observable<any> {
    const userId = this.sessionService.getUserIdValue();
    parking['userId'] = userId;

    return this.parkingApiService.createParking(parking);
  }

  public getDriverFromSelectedSpot(
    selectedSpotId: string
  ): Observable<ParkingDriver> {
    return this.parkingApiService.getDriverFromSelectedSpot(selectedSpotId);
  }

  private addDriverToSelectedSpot(slotDriver): Observable<any> {
    let parking = this.getParkingStateValue();
    let parkingAreaStatus = this.getParkingAreaStateValue();
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
    let parking = this.getParkingStateValue();
    let parkingAreaStatus = this.getParkingAreaStateValue();
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

  private calculateParkingSpotsStatusAtCheckIn(parkingStatus): any {
    if (parkingStatus.freeSpots - 1 < 0) {
      parkingStatus.freeSpots = 0;
    } else {
      parkingStatus.freeSpots--;
    }

    parkingStatus.usedSpots++;

    return parkingStatus;
  }

  private calculateParkingSpotsStatusAtCheckOut(parkingStatus): any {
    parkingStatus.freeSpots++;
    parkingStatus.usedSpots--;

    return parkingStatus;
  }
}
