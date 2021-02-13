import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TerrainComponent } from '@app/feature/parking/components/terrain/terrain.component';
import { UpdateLineSizeDirective } from '@app/feature/parking/directives/update-line-size.directive';

import { ParkingApiService } from '@app/feature/parking/services/parking-api-service';
import { ParkingService } from '@app/feature/parking/services/parking.service';
import { ParkingServiceMock } from '@app/feature/parking/test-data/parking-service-mock';

describe('TerrainComponent', () => {
  let component: TerrainComponent;
  let fixture: ComponentFixture<TerrainComponent>;
  let parkingService: jasmine.SpyObj<any>;
  let parkingApiService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerrainComponent, UpdateLineSizeDirective],
      providers: [
        {
          provide: ParkingService,
          useValue: jasmine.createSpyObj('ParkingService', ['getSelectedCell']),
        },
        {
          provide: ParkingApiService,
          useValue: jasmine.createSpyObj('ParkingApiService', [
            'getDriverFromSelectedSpot',
          ]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TerrainComponent);
    component = fixture.componentInstance;
    parkingService = TestBed.inject(ParkingService);
    parkingApiService = TestBed.inject(ParkingApiService);
  });
});
