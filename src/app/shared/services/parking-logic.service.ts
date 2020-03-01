import { Injectable } from '@angular/core';

import { Spot } from '../interfaces/spot.interface';
import { Coordinate } from '../interfaces/coordinate.interface';
import { ParkingData } from '../interfaces/parking-data.interface';

import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class ParkingLogicService {

  public parkingData: ParkingData = {
    selectedArea: 3,
    selectedFloor: 'parter'
  }

  constructor(private http: HttpClient) { }

  public updateParkingPlacements(coordinate: Coordinate, parkingPlacements: Spot[]): Spot {
    const selectedCell = _.find(parkingPlacements, spot => spot.x === coordinate.x && spot.y === coordinate.y);
    return selectedCell;
  }

  public getSelectedParking(userId: any) {
    return of(this.http.get(`http://localhost:3000/api/parking/${userId}`));
  }

  public getSelectedParkingArea(parkingId: any) {
    return this.http.get(`http://localhost:3000/api/parking/${parkingId}`)
  }
}
