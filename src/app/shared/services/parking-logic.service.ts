import { Injectable } from '@angular/core';

import { Spot } from '../interfaces/spot.interface';
import { Coordinate } from '../interfaces/coordinate.interface';
import { ParkingData } from '../interfaces/parking-data.interface';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParkingLogicService {

  public parkingData: ParkingData = {
    selectedArea: 0,
    selectedFloor: 'Parter'
  }

  constructor(private http: HttpClient) { }

  public updateParkingPlacements(coordinate: Coordinate, parkingPlacements: Spot[]): Spot {
    const selectedCell = _.find(parkingPlacements, spot => spot.x === coordinate.x && spot.y === coordinate.y);
    return selectedCell;
  }

  public getAdminParkings(userId: number) {
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
