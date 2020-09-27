import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ParkingItemsComponent } from '@app/feature/parking/components/parking-items/parking-items.component'

import { ParkingService } from '@app/shared/services/parking.service';
import { SpinnerService } from '@app/shared/services/spinner-service';
import { ParkingServiceMock } from '@app/shared/test-data/parking-service-mock';

describe('ParkingItemsComponent', () => {
  let component: ParkingItemsComponent;
  let fixture: ComponentFixture<ParkingItemsComponent>;
  let spinnerService: jasmine.SpyObj<any>;
  let parkingService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingItemsComponent],
      providers: [
        { provide: ParkingService, useValue: jasmine.createSpyObj('ParkingService', ['getSelectedParkingLevels']) },
        { provide: SpinnerService, useValue: jasmine.createSpyObj('SpinnerService', ['makeSpinnerVisible', 'hideSpinner']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingItemsComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
    parkingService = TestBed.inject(ParkingService);
  })

  describe('the *editSelectedParking* method', () => {
    it('should call makeSpinnerVisible method from spinnerService', () => {
      const selectedParking = ParkingServiceMock.getParking();
      parkingService.getSelectedParkingLevels.and.returnValue(of(null));

      component.editSelectedParking(selectedParking);

      expect(spinnerService.makeSpinnerVisible).toHaveBeenCalled();
    })

    it('should call getSelectedParkingLevels method from parkingService', () => {
      const selectedParking = ParkingServiceMock.getParking();
      parkingService.getSelectedParkingLevels.and.returnValue(of(null));

      component.editSelectedParking(selectedParking);

      expect(parkingService.getSelectedParkingLevels).toHaveBeenCalled();
    })

    it('should call hideSpinner method from spinnerService', () => {
      const selectedParking = ParkingServiceMock.getParking();
      parkingService.getSelectedParkingLevels.and.returnValue(of(null));

      component.editSelectedParking(selectedParking);

      expect(spinnerService.hideSpinner).toHaveBeenCalled();
    })

    it('should call emit method for getSelectedParking output', () => {
      const selectedParking = ParkingServiceMock.getParking();
      spyOn(component.getSelectedParking, 'emit');
      parkingService.getSelectedParkingLevels.and.returnValue(of(null));

      component.editSelectedParking(selectedParking);

      expect(component.getSelectedParking.emit).toHaveBeenCalled();
    })

    it('should call emit method with selectedParking', () => {
      const selectedParking = ParkingServiceMock.getParking();
      const parkingLevels = ParkingServiceMock.getSelectedParkingLevels();
      selectedParking.levels = parkingLevels;
      spyOn(component.getSelectedParking, 'emit');
      parkingService.getSelectedParkingLevels.and.returnValue(of(parkingLevels));

      component.editSelectedParking(selectedParking);

      expect(component.getSelectedParking.emit).toHaveBeenCalledWith(selectedParking);
    })
  });
})
