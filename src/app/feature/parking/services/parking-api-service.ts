import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { Spot } from '@app/feature/parking/interfaces/spot.interface';

@Injectable()
export class ParkingApiService {
  constructor(private http: HttpClient) {}

  public addParkingSpots(parkingArea: ParkingArea): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/parking/edit/area',
      parkingArea
    );
  }

  public createParking(parking): Observable<any> {
    return this.http.post('http://localhost:3000/api/create/parking', parking);
  }

  public deleteDriver(driver: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/driver/delete`, driver);
  }

  public getDriverFromSelectedSpot(spot: Spot): Observable<any> {
    return this.http.post(`http://localhost:3000/api/parking/driver`, spot);
  }

  public getParkings(userId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/parking/${userId}`);
  }

  public deleteSelectedParking(id): Observable<any> {
    return this.http.post(`http://localhost:3000/api/parking/delete`, id);
  }

  public addDriverToSelectedSpot(driver: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/parking/insert/driver',
      driver
    );
  }

  public getSelectedParkingEntries(parkingId: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/parking/entries/${parkingId}`
    );
  }

  public getSelectedParkingAreas(parkingEntryId: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/parking/area/${parkingEntryId}`
    );
  }

  public getAreaParkingSlots(parkingAreaId: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/parking/spots/${parkingAreaId}`
    );
  }

  public changeSlotStatus(
    slotId: string,
    active: number,
    parkingId: string
  ): Observable<any> {
    return this.http.post('http://localhost:3000/api/parking/spot', {
      slotId,
      active,
      parkingId,
    });
  }
}
