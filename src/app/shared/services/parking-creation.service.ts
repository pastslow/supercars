import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingService } from '@app/shared/services/parking.service';
import { SessionService } from '@app/core/services/session.service';

@Injectable()
export class ParkingCreationService {
  constructor(
    private parkingApiService: ParkingApiService,
    private parkingService: ParkingService,
    private sessionService: SessionService
  ) {}

  public createParking(parking): Observable<any> {
    const userId = this.sessionService.getUserIdValue();
    parking.userId = userId;

    return this.parkingApiService.createParking(parking);
  }
}
