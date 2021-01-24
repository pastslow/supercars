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

  describe('OnInit', () => {
    it('should call updateSelectedParking if parking is defined', () => {
      spyOn(component, 'updateSelectedParking');
      component.parking = ParkingServiceMock.getParking();

      fixture.detectChanges();

      expect(component.updateSelectedParking).toHaveBeenCalled();
    });

    it('should not call updateSelectedParking if parking does not exists', () => {
      spyOn(component, 'updateSelectedParking');

      fixture.detectChanges();

      expect(component.updateSelectedParking).not.toHaveBeenCalled();
    });
  });

  describe('the *getSelectedCell* method', () => {
    it('should call getSelectedCell from parkingService', () => {
      const coordinateY = 1;
      const coordinateX = 1;

      component.getSelectedCell(coordinateY, coordinateX);

      expect(parkingService.getSelectedCell).toHaveBeenCalled();
    });
  });

  describe('the *isBlockCell* method', () => {
    it('should call getSelectedCell from parkingService', () => {
      const coordinateY = 1;
      const coordinateX = 1;

      component.isBlockCell(coordinateY, coordinateX);

      expect(parkingService.getSelectedCell).toHaveBeenCalled();
    });

    it('should return true if selectedCell orientation is block-cell', () => {
      const coordinateY = 1;
      const coordinateX = 1;
      const selectedCell = ParkingServiceMock.getSpotWithCustomOrientation(
        'block-cell'
      );
      parkingService.getSelectedCell.and.returnValue(selectedCell);

      const isBlockCell = component.isBlockCell(coordinateY, coordinateX);

      expect(isBlockCell).toBeTrue();
    });

    it('should return false if selectedCell orientation is not block-cell', () => {
      const coordinateY = 1;
      const coordinateX = 1;
      const selectedCell = ParkingServiceMock.getSpotWithCustomOrientation(
        'clockwise-cell'
      );
      parkingService.getSelectedCell.and.returnValue(selectedCell);

      const isBlockCell = component.isBlockCell(coordinateY, coordinateX);

      expect(isBlockCell).toBeFalse();
    });
  });

  describe('the *getCellData* method', () => {
    it('should call getSelectedCell from parkingService', () => {
      const coordinateY = 1;
      const coordinateX = 1;

      component.getCellData(coordinateY, coordinateX, 'active');

      expect(parkingService.getSelectedCell).toHaveBeenCalled();
    });
  });

  describe('the *getSelectedSpot* method', () => {
    it('should call getDriverFromSelectedSpot from parkingApiService', () => {
      const coordinateY = 1;
      const coordinateX = 1;
      const driver = ParkingServiceMock.getDriver(1);
      component.parkingPlacements = ParkingServiceMock.getParkingPlacements();
      parkingApiService.getDriverFromSelectedSpot.and.returnValue(
        of({ drivers: [driver] })
      );

      component.getSelectedSpot(coordinateY, coordinateX);

      expect(parkingApiService.getDriverFromSelectedSpot).toHaveBeenCalled();
    });
  });
});
