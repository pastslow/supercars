import { TestBed } from '@angular/core/testing';

import { ParkingMapperService } from './parking-mapper.service';

describe('ParkingMapperService', () => {
  let service: ParkingMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
