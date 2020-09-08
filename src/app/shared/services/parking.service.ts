import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpResponse } from '@app/shared/interfaces/http-response.interface';
import { ParkingLevel } from '@app/shared/interfaces/parking-level.interface';
import { Coordinate } from '@app/shared/interfaces/coordinate.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingAreaStatus } from '@app/shared/interfaces/parking-area-status.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';

import { ParkingApiService } from '@app/shared/services/parking-api-service';

@Injectable()
export class ParkingService {
  private parkingData$: BehaviorSubject<ParkingData> = new BehaviorSubject(
    { selectedArea: 'Area 1', selectedFloor: 'Parter' });

  private parkingAreaStatus$: BehaviorSubject<ParkingAreaStatus> = new BehaviorSubject(
    {
      totalSpots: 0,
      usedSpots: 0,
      unusedSpots: 0
    }
  );

  public getParkingData$(): BehaviorSubject<ParkingData> {
    return this.parkingData$;
  }

  public updateParkingData(parkingData: ParkingData): void {
    this.parkingData$.next(parkingData);
  }

  public getParkingAreaStatus$(): BehaviorSubject<ParkingAreaStatus> {
    return this.parkingAreaStatus$;
  }

  public updateParkingAreaStatus(parkingAreaStatus: ParkingAreaStatus): void {
    this.parkingAreaStatus$.next(parkingAreaStatus)
  }

  constructor(private parkingApiService: ParkingApiService) { }

  public getSelectedCell(coordinate: Coordinate, parkingPlacements: Spot[]): Spot {
    const selectedCell = parkingPlacements.find(spot => spot.x === coordinate.x && spot.y === coordinate.y);
    return selectedCell;
  }

  public getSelectedAreaSpotsByStatus(selectedArea: ParkingArea): void {
    const usedSpots = 1;
    const unusedSpots = 0;
    const parkingAreaStatus: ParkingAreaStatus = { parkingId: 0, totalSpots: 0, usedSpots: 0, unusedSpots: 0 }

    parkingAreaStatus.parkingId = selectedArea.parking_entries_id;
    parkingAreaStatus.totalSpots = selectedArea.spots.length;
    parkingAreaStatus.usedSpots = selectedArea.spots.filter(spot => spot.active === usedSpots).length;
    parkingAreaStatus.unusedSpots = selectedArea.spots.filter(spot => spot.active === unusedSpots).length;

    this.updateParkingAreaStatus(parkingAreaStatus);
  }

  public getSelectedParkingLevels(selectedParking: Parking): Observable<ParkingLevel[]> {
    return this.parkingApiService.getSelectedParkingEntries(selectedParking.id).pipe(
      map((result: HttpResponse) => {
        const parking: HttpResponse = {};
        parking.levels = result.entries;
        return parking.levels;
      }),
      mergeMap((parkingLevels: ParkingLevel[]) => {
        for (const level of parkingLevels) {
          return this.parkingApiService.getSelectedParkingAreas(level.id).pipe(map((response: HttpResponse) => {
            level.areas = response.areas;
            return parkingLevels;
          }))
        }
      }),
      mergeMap((parkingLevels: ParkingLevel[]) => {
        for (const level of parkingLevels) {
          for (const area of level.areas) {
            return this.parkingApiService.getAreaParkingSlots(area.id).pipe(map((response: HttpResponse) => {
              area.spots = response.spots;
              return parkingLevels;
            }))
          }
        }
      })
    )
  }
}

