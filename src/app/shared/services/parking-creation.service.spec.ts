import { TestBed } from '@angular/core/testing';

import { ParkingCreationService } from './parking-creation.service';

describe('ParkingCreationService', () => {
  let service: ParkingCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
