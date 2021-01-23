import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';

@Injectable()
export class ParkingApiService {
  constructor(private http: HttpClient) {}

  public createParking(parking): Observable<any> {
    return this.http.post('http://localhost:3000/api/create/parking', parking);
  }

  public deleteDriver(driver: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/driver/delete`, driver);
  }

  public getDriverFromSelectedSpot(spotId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/parking/driver/${spotId}`);
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

  public changeSlotStatus(slotId: number, active: number): Observable<any> {
    return this.http.post('http://localhost:3000/api/parking/spot', {
      slotId,
      active,
    });
  }
}
