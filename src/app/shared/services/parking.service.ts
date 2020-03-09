import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

import { Coordinate } from '@app/shared/interfaces/coordinate.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';

@Injectable()
export class ParkingService {

  public parkingData: ParkingData = {
    selectedArea: 0,
    selectedFloor: 'Parter'
  }

  constructor(private http: HttpClient) { }

  public updateParkingPlacements(coordinate: Coordinate, parkingPlacements: Spot[]): Spot {
    const selectedCell = _.find(parkingPlacements, spot => spot.x === coordinate.x && spot.y === coordinate.y);
    return selectedCell;
  }

  public getParkings(userId: number) {
    return this.http.get(`http://localhost:3000/api/parking/${userId}`);
  }

  public getSelectedParkingEntries(parkingId: number) {
    return this.http.get(`http://localhost:3000/api/parking/entries/${parkingId}`)
  }

  public getSelectedParkingAreas(parkingEntryId: number) {
    return this.http.get(`http://localhost:3000/api/parking/area/${parkingEntryId}`)
  }

  public getAreaParkingSlots(parkingAreaId: number) {
    return this.http.get(`http://localhost:3000/api/parking/spots/${parkingAreaId}`)
  }

  public changeSlotStatus(slotId: number, active: number) {
    return this.http.get(`http://localhost:3000/api/parking/spot/${slotId}/${active}`)
  }
}
