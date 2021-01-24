import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ParkingItemsComponent } from '@app/feature/parking/components/parking-items/parking-items.component';

import { ParkingService } from '@app/feature/parking/services/parking.service';
import { SpinnerService } from '@app/core/services/spinner-service';
import { ParkingServiceMock } from '@app/feature/parking/test-data/parking-service-mock';

describe('ParkingItemsComponent', () => {
  let component: ParkingItemsComponent;
  let fixture: ComponentFixture<ParkingItemsComponent>;
  let spinnerService: jasmine.SpyObj<any>;
  let parkingService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingItemsComponent],
      providers: [
        {
          provide: ParkingService,
          useValue: jasmine.createSpyObj('ParkingService', [
            'getSelectedParkingLevels',
          ]),
        },
        {
          provide: SpinnerService,
          useValue: jasmine.createSpyObj('SpinnerService', [
            'makeSpinnerVisible',
            'hideSpinner',
          ]),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingItemsComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
    parkingService = TestBed.inject(ParkingService);
  });
});
