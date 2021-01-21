import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ParkingComponent } from '@app/feature/parking/view/parking.component';

import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingService } from '@app/shared/services/parking.service';
import { ParkingServiceMock } from '@app/shared/test-data/parking-service-mock';

describe('Parking Component', () => {
  let component: ParkingComponent;
  let fixture: ComponentFixture<ParkingComponent>;
  let parkingApiService: jasmine.SpyObj<any>;
  let parkingService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingComponent],
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

    fixture = TestBed.createComponent(ParkingComponent);
    component = fixture.componentInstance;
    parkingApiService = TestBed.inject(ParkingApiService);
    parkingService = TestBed.inject(ParkingService);
  });

  describe('OnInit', () => {
    it('should call *getParkings* from parkingApiService', () => {
      parkingApiService.getParkings.and.returnValue(of({}));

      fixture.detectChanges();

      expect(parkingApiService.getParkings).toHaveBeenCalled();
    });
  });

  describe('the *backToParkings* method', () => {
    it('should change displayParkingZone value to false', () => {
      component.displayParkingZone = true;

      component.backToParkings();

      expect(component.displayParkingZone).toBe(false);
    });
  });

  describe('the *getSelectedParking* method', () => {
    it('should change selectedParking with parking parameter from getSelectedParking method', () => {
      const parking = ParkingServiceMock.getParking();
      component.selectedParking = null;
      parkingService.getParkingData$.and.returnValue(of(null));

      component.getSelectedParking(parking);

      expect(component.selectedParking).toEqual(parking);
    });

    it('should call getParkingData$ method from parkingService', () => {
      const parking = ParkingServiceMock.getParking();
      component.selectedParking = null;
      parkingService.getParkingData$.and.returnValue(of(null));

      component.getSelectedParking(parking);

      expect(parkingService.getParkingData$).toHaveBeenCalled();
    });

    it('should change displayParkingZone variable to be true', () => {
      const parking = ParkingServiceMock.getParking();
      component.selectedParking = null;
      parkingService.getParkingData$.and.returnValue(of(null));

      component.getSelectedParking(parking);

      expect(component.displayParkingZone).toBe(true);
    });
  });
});
