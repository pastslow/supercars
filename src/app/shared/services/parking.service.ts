import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpResponse } from '@app/shared/interfaces/http-response.interface';
import { ParkingLevel } from '@app/shared/interfaces/parking-level.interface';
import { Coordinate } from '@app/shared/interfaces/coordinate.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';

import { SdkParkingService } from '@app/shared/services/sdk-parking.service';

@Injectable()
export class ParkingService {

  public parkingData: ParkingData = {
    selectedArea: 'Area 1',
    selectedFloor: 'Parter'
  }

  public parkingAreaStatus = {
    totalSpots: 0,
    usedSpots: 0,
    unusedSpots: 0
  }

  constructor(private sdkParkingService: SdkParkingService) { }

  public getSelectedCell(coordinate: Coordinate, parkingPlacements: Spot[]): Spot {
    const selectedCell = parkingPlacements.find(spot => spot.x === coordinate.x && spot.y === coordinate.y);
    return selectedCell;
  }

  public getSelectedAreaSpotsByStatus(selectedArea): void {
    const usedSpots = 1;
    const unusedSpots = 0;

    this.parkingAreaStatus.totalSpots = selectedArea.spots.length;
    this.parkingAreaStatus.usedSpots = selectedArea.spots.filter(spot => spot.active === usedSpots).length;
    this.parkingAreaStatus.unusedSpots = selectedArea.spots.filter(spot => spot.active === unusedSpots).length;
  }

  public getSelectedParkingLevels(selectedParking: Parking): Observable<ParkingLevel[]> {
    return this.sdkParkingService.getSelectedParkingEntries(selectedParking.id).pipe(
      map((result: HttpResponse) => {
        const parking: HttpResponse = {};
        parking.levels = result.entries;
        return parking.levels;
      }),
      mergeMap((parkingLevels: ParkingLevel[]) => {
        for (const level of parkingLevels) {
          return this.sdkParkingService.getSelectedParkingAreas(level.id).pipe(map((response: HttpResponse) => {
            level.areas = response.areas;
            return parkingLevels;
          }))
        }
      }),
      mergeMap((parkingLevels: ParkingLevel[]) => {
        for (const level of parkingLevels) {
          for (const area of level.areas) {
            return this.sdkParkingService.getAreaParkingSlots(area.id).pipe(map((response: HttpResponse) => {
              area.spots = response.spots;
              return parkingLevels;
            }))
          }
        }
      })
    )
  }
}

