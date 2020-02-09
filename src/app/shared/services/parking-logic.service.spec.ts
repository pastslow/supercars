import { TestBed } from '@angular/core/testing';

import { ParkingLogicService } from './parking-logic.service';

describe('ParkingLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkingLogicService = TestBed.get(ParkingLogicService);
    expect(service).toBeTruthy();
  });
});
