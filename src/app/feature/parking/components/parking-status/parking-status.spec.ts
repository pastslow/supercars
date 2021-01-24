import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ParkingStatusComponent } from '@app/feature/parking/components/parking-status/parking-status.component';

import { ParkingApiService } from '@app/feature/parking/services/parking-api-service';
import { ParkingService } from '@app/feature/parking/services/parking.service';
import { ParkingServiceMock } from '@app/feature/parking/test-data/parking-service-mock';

describe('ParkingStatusComponent', () => {
  let component: ParkingStatusComponent;
  let fixture: ComponentFixture<ParkingStatusComponent>;
  let parkingService: jasmine.SpyObj<any>;
  let parkingApiService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingStatusComponent],
      providers: [
        {
          provide: ParkingService,
          useValue: jasmine.createSpyObj('ParkingService', [
            'getParkingAreaStatus$',
          ]),
        },
        {
          provide: ParkingApiService,
          useValue: jasmine.createSpyObj('ParkingApiService', []),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingStatusComponent);
    component = fixture.componentInstance;
    parkingService = TestBed.inject(ParkingService);
    parkingApiService = TestBed.inject(ParkingApiService);
  });
});
