import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { HttpResponse } from '@app/shared/interfaces/http-response.interface';
import { ParkingApiService } from '@app/shared/services/parking-api-service';

import { SessionService } from '@app/core/services/session.service';
import { ParkingService } from '@app/shared/services/parking.service';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';

@Injectable()
export class ParkingFacadeService {
  constructor(
    private parkingApiService: ParkingApiService,
    private sessionService: SessionService,
    private parkingService: ParkingService
  ) {}

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

  public getSelectedParking(): Observable<ParkingData> {
    return this.parkingService.getParkingData$().asObservable();
  }
}
