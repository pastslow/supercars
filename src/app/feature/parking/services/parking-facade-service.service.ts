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

  public getTemporaryAreaDeletedSpotsIdsValue(): string[] {
    return this.parkingService.getTemporaryAreaDeletedSpotsIdsValue();
  }

  public updateTemporaryAreaDeletedSpots(deletedSpotsIds: string[]): void {
    return this.parkingService.updateTemporaryAreaDeletedSpots(deletedSpotsIds);
  }

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
  ): Observable<ParkingArea> {
    return this.parkingApiService
      .changeSlotStatus(selectedSpot.id, isSlotActive, selectedSpot.parkingId)
      .pipe(
        mergeMap(() => {
          if (isSlotActive === ParkingSlotStatus.active) {
            return this.addDriverToSelectedSpot(driver);
          } else {
            return this.removeDriverFromSelectedSpot(selectedSpot.id);
          }
        }),
        tap((parkingAreaStatus: ParkingArea) => {
          selectedSpot.active = isSlotActive;

          if (parkingAreaStatus) {
            const parkingArea = this.parkingService.getParkingAreaStateValue();
            parkingArea.freeSpots = parkingAreaStatus.freeSpots;
            parkingArea.usedSpots = parkingAreaStatus.usedSpots;

            this.parkingService.updateParkingAreaState(parkingArea);
          }
        })
      );
  }

  public deleteSelectedParking(id: string): Observable<any> {
    return this.parkingApiService.deleteSelectedParking({
      parkingId: id,
    });
  }

  public saveAreaChanges(): Observable<Spot[]> {
    const selectedParkingArea = this.getParkingAreaStateValue();
    const temporaryAreaSpots = this.parkingService.getTemporaryAreaSpotsStateValue();

    const newParkingArea = Object.assign({}, selectedParkingArea);
    newParkingArea.spots = temporaryAreaSpots;
    newParkingArea[
      'deletedSpots'
    ] = this.parkingService.getTemporaryAreaDeletedSpotsIdsValue();

    return this.parkingApiService.addParkingSpots(newParkingArea).pipe(
      map((parkingAreaStatus) => {
        selectedParkingArea.spots = selectedParkingArea.spots.filter(
          (spot) => spot.id !== null
        );

        selectedParkingArea.freeSpots = parkingAreaStatus.freeSpots;
        selectedParkingArea.totalSpots = parkingAreaStatus.totalSpots;
        selectedParkingArea.spots = [
          ...selectedParkingArea.spots,
          ...parkingAreaStatus.areaSpots,
        ];
        this.updateParkingAreaState(selectedParkingArea);
        this.updateTemporaryAreaSpotsState([]);
        this.updateTemporaryAreaDeletedSpots([]);

        return parkingAreaStatus;
      })
    );
  }

  public createParking(parking: Parking): Observable<any> {
    const userId = this.sessionService.getUserIdValue();
    parking['userId'] = userId;

    return this.parkingApiService.createParking(parking);
  }

  public getDriverFromSelectedSpot(
    selectedSpot: Spot
  ): Observable<ParkingDriver> {
    return this.parkingApiService.getDriverFromSelectedSpot(selectedSpot);
  }

  private addDriverToSelectedSpot(slotDriver): Observable<any> {
    const parkingArea = this.getParkingAreaStateValue();

    return this.parkingApiService.addDriverToSelectedSpot({
      driver: slotDriver,
      parkingAreaId: parkingArea.id,
    });
  }

  private removeDriverFromSelectedSpot(selectedSpotId): Observable<any> {
    const parkingArea = this.getParkingAreaStateValue();

    return this.parkingApiService.deleteDriver({
      spotId: selectedSpotId,
      parkingAreaId: parkingArea.id,
      parkingId: parkingArea.parkingId,
    });
  }
}
