import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ParkingApiService } from '@app/feature/parking/services/parking-api-service';
import { SessionService } from '@app/core/services/session.service';
import { Parking } from '@app/feature/parking/interfaces/parking.interface';

@Injectable()
export class ParkingCreationService {
  constructor(
    private parkingApiService: ParkingApiService,
    private sessionService: SessionService
  ) {}

  public createParking(parking: Parking): Observable<any> {
    const userId = this.sessionService.getUserIdValue();
    parking['userId'] = userId;

    return this.parkingApiService.createParking(parking);
  }
}
