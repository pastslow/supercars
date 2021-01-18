import { TestBed } from '@angular/core/testing';

import { ParkingFacadeService } from './parking-facade-service.service';

describe('ParkingFacadeServiceService', () => {
  let service: ParkingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
