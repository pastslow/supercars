import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpResponse } from '@app/shared/interfaces/http-response.interface';

@Injectable()
export class ParkingApiService {
  constructor(private http: HttpClient) { }

  public deleteDriver(spotId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/driver/delete/${spotId}`)
  }

  public getDriverFromSelectedSpot(spotId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/parking/driver/${spotId}`);
  }

  public getParkings(userId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/parking/${userId}`);
  }

  public updateParkingSpotsNumbers(parkingId: number, totalSpots: number,
    unusedSpots: number, usedSpots: number): Observable<HttpResponse> {
    return this.http.post('http://localhost:3000/api/parking/update', { parkingId, totalSpots, unusedSpots, usedSpots });
  }

  public addDriverToSelectedSpot(driver): Observable<HttpResponse> {
    return this.http.post('http://localhost:3000/api/parking/insert/driver', driver);
  }

  public getSelectedParkingEntries(parkingId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/parking/entries/${parkingId}`)
  }

  public getSelectedParkingAreas(parkingEntryId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/parking/area/${parkingEntryId}`)
  }

  public getAreaParkingSlots(parkingAreaId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/parking/spots/${parkingAreaId}`)
  }

  public changeSlotStatus(slotId: number, active: number): Observable<HttpResponse> {
    return this.http.post('http://localhost:3000/api/parking/spot', { slotId, active })
  }
}
