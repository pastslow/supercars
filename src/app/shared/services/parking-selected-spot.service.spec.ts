import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';

import * as moment from 'moment';

import { SharedConstants } from '@app/shared/constants/shared-constants';

import { ParkingServiceMock } from '@app/shared/test-data/parking-service-mock';
import { ParkingSelectedSpotService } from '@app/shared/services/parking-selected-spot.service';
import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingService } from '@app/shared/services/parking.service';

describe('ParkingSelectedSpotService', () => {
  let service: jasmine.SpyObj<any>;
  let parkingApiService: jasmine.SpyObj<any>;
  let parkingService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ParkingSelectedSpotService,
        {
          provide: ParkingApiService,
          useValue: jasmine.createSpyObj('ParkingApiService', [
            'changeSlotStatus',
            'addDriverToSelectedSpot',
            'deleteDriver',
          ]),
        },
        {
          provide: ParkingService,
          useValue: jasmine.createSpyObj('ParkingService', [
            'getSelectedAreaSpotsByStatus',
          ]),
        },
      ],
    });

    parkingService = TestBed.inject(ParkingService);
    parkingApiService = TestBed.inject(ParkingApiService);
    service = TestBed.inject(ParkingSelectedSpotService);
  });

  describe('the *getDriverTimeSpend* method', () => {
    it('should return an empty string when driver does not exists', () => {
      const driver = null;

      const driverTimeSpend = service.getDriverTimeSpend(driver);

      expect(driverTimeSpend).toEqual('');
    });

    it('should driver time spend when driver object is provided', () => {
      const driver = {
        name: 'Test',
        carPlate: 'IS 22 ACB',
        phoneNumber: '021 222 333',
        date: '',
        parkingSpotId: 0,
        check_in: moment(),
      };

      const driverTimeSpend = service.getDriverTimeSpend(driver);

      expect(driverTimeSpend).toBeDefined();
    });
  });

  describe('the *getDriverCheckInTime* method', () => {
    it('should return current day in a specific format', () => {
      const dayFormat = SharedConstants.dateLongFormat;
      const currentDay = moment().format(dayFormat);

      const driverCheckInTime = service.getDriverCheckInTime();

      expect(driverCheckInTime).toEqual(currentDay);
    });
  });

  describe('the *displayFormControlError* method', () => {
    it('should return true when provided formControl is not valid and the formGroup has been touched', () => {
      const formGroup: FormGroup = new FormGroup({
        testFormControl: new FormControl('', [Validators.required]),
      });
      formGroup.markAsTouched();

      const isFormControlErrorDisplayed = service.displayFormControlError(
        formGroup,
        'testFormControl'
      );

      expect(isFormControlErrorDisplayed).toBeTrue();
    });

    it('should return false when provided formControl is valid and the formGroup has been touched', () => {
      const formGroup: FormGroup = new FormGroup({
        testFormControl: new FormControl('', [Validators.required]),
      });
      formGroup.controls.testFormControl.patchValue('test');
      formGroup.markAsTouched();

      const isFormControlErrorDisplayed = service.displayFormControlError(
        formGroup,
        'testFormControl'
      );

      expect(isFormControlErrorDisplayed).toBeFalse();
    });
  });

  describe('the *changeSlotStatus* method', () => {
    it('should call changeSlotStatus method from parkingApiService', () => {
      const parkingSpots = ParkingServiceMock.getParkingPlacements();
      const selectedSpot = parkingSpots[0];
      const isSlotActive = 0;
      const selectedArea = null;
      const formGroup = new FormGroup({});

      parkingApiService.deleteDriver.and.returnValue(of({}));
      parkingApiService.changeSlotStatus.and.returnValue(of({}));

      service
        .changeSlotStatus(selectedSpot, isSlotActive, selectedArea, formGroup)
        .subscribe(() => {
          expect(parkingApiService.changeSlotStatus).toHaveBeenCalled();
        });
    });

    it('should call addDriverToSelectedSpot from parkingApiService when isSlotActive is equal with 1', () => {
      const parkingSpots = ParkingServiceMock.getParkingPlacements();
      const selectedSpot = parkingSpots[0];
      const isSlotActive = 1;
      const selectedArea = null;
      const formGroup = ParkingServiceMock.getDriverFormGroup();

      parkingApiService.addDriverToSelectedSpot.and.returnValue(of({}));
      parkingApiService.changeSlotStatus.and.returnValue(of({}));

      service
        .changeSlotStatus(selectedSpot, isSlotActive, selectedArea, formGroup)
        .subscribe(() => {
          expect(parkingApiService.addDriverToSelectedSpot).toHaveBeenCalled();
        });
    });

    it('should call addDriverToSelectedSpot with the driver object extracted from formGroup when isSlotActive is equal with 1 ', () => {
      const parkingSpots = ParkingServiceMock.getParkingPlacements();
      const selectedSpot = parkingSpots[0];
      const isSlotActive = 1;
      const formGroup = ParkingServiceMock.getDriverFormGroup();
      const driver = ParkingServiceMock.getDriver(selectedSpot.id);

      parkingApiService.addDriverToSelectedSpot.and.returnValue(of({}));
      parkingApiService.changeSlotStatus.and.returnValue(of({}));

      service
        .changeSlotStatus(selectedSpot, isSlotActive, null, formGroup)
        .subscribe(() => {
          expect(
            parkingApiService.addDriverToSelectedSpot
          ).toHaveBeenCalledWith(driver);
        });
    });

    it('should call deleteDriver method from parkingApiService when isSlotActive is equal with 0', () => {
      const parkingSpots = ParkingServiceMock.getParkingPlacements();
      const selectedSpot = parkingSpots[0];
      const isSlotActive = 0;
      const selectedArea = null;
      const formGroup = new FormGroup({});

      parkingApiService.deleteDriver.and.returnValue(of({}));
      parkingApiService.changeSlotStatus.and.returnValue(of({}));

      service
        .changeSlotStatus(selectedSpot, isSlotActive, selectedArea, formGroup)
        .subscribe(() => {
          expect(parkingApiService.deleteDriver).toHaveBeenCalled();
        });
    });

    it('should call getSelectedAreaSpotsByStatus from parkingService', () => {
      const parkingSpots = ParkingServiceMock.getParkingPlacements();
      const selectedSpot = parkingSpots[0];
      const isSlotActive = 0;
      const selectedArea = null;
      const formGroup = new FormGroup({});

      parkingApiService.deleteDriver.and.returnValue(of({}));
      parkingApiService.changeSlotStatus.and.returnValue(of({}));

      service
        .changeSlotStatus(selectedSpot, isSlotActive, selectedArea, formGroup)
        .subscribe(() => {
          expect(
            parkingService.getSelectedAreaSpotsByStatus
          ).toHaveBeenCalled();
        });
    });

    it('should update *active* property from selectedSpot with isSlotActive value', () => {
      const parkingSpots = ParkingServiceMock.getParkingPlacements();
      const selectedSpot = parkingSpots[0];
      selectedSpot.active = 1;
      const isSlotActive = 0;
      const selectedArea = null;
      const formGroup = new FormGroup({});

      parkingApiService.deleteDriver.and.returnValue(of({}));
      parkingApiService.changeSlotStatus.and.returnValue(of({}));

      service
        .changeSlotStatus(selectedSpot, isSlotActive, selectedArea, formGroup)
        .subscribe(() => {
          expect(selectedSpot.active).toEqual(0);
        });
    });
  });
});
