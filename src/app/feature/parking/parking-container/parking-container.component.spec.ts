import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingApiService } from '@app/feature/parking/services/parking-api-service';
import { ParkingService } from '@app/feature/parking/services/parking.service';
import { ParkingContainerComponent } from '@app/feature/parking/parking-container/parking-container.component';

describe('Parking Component', () => {
  let component: ParkingContainerComponent;
  let fixture: ComponentFixture<ParkingContainerComponent>;
  let parkingApiService: jasmine.SpyObj<any>;
  let parkingService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingContainerComponent],
      providers: [
        {
          provide: ParkingApiService,
          useValue: jasmine.createSpyObj('ParkingApiService', ['getParkings']),
        },
        {
          provide: ParkingService,
          useValue: jasmine.createSpyObj('ParkingService', ['getParkingData$']),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingContainerComponent);
    component = fixture.componentInstance;
    parkingApiService = TestBed.inject(ParkingApiService);
    parkingService = TestBed.inject(ParkingService);
  });
});
