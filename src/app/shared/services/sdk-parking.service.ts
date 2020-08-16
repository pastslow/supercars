import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../interfaces/http-response.interface';
import { Observable } from 'rxjs';

@Injectable()
export class SdkParkingService {
  constructor(private http: HttpClient) { }

  public getDriverFromSelectedSpot(slotId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/parking/driver/${slotId}`);
  }

  public getParkings(userId: number): Observable<HttpResponse> {
    return this.http.get(`http://localhost:3000/api/parking/${userId}`);
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
    return this.http.get(`http://localhost:3000/api/parking/spot/${slotId}/${active}`)
  }
}
