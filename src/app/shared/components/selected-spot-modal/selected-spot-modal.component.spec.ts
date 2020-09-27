import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChanges } from '@angular/core';

import { SelectedSpotModalComponent } from '@app/shared/components/selected-spot-modal/selected-spot-modal.component'

import { ParkingSelectedSpotService } from '@app/shared/services/parking-selected-spot.service';

describe('SelectedSpotModalComponent', () => {
  let component: SelectedSpotModalComponent;
  let fixture: ComponentFixture<SelectedSpotModalComponent>;
  let parkingSelectedSpotService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectedSpotModalComponent
      ],
      providers: [
        { provide: ParkingSelectedSpotService, useValue: jasmine.createSpyObj('ParkingSelectedSpotService', ['changeSlotStatus', 'displayFormControlError', 'getDriverCheckInTime', 'getDriverTimeSpend']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedSpotModalComponent);
    component = fixture.componentInstance;
    parkingSelectedSpotService = TestBed.inject(ParkingSelectedSpotService);
  });

  describe('OnChanges', () => {
    it('should call getDriverCheckInTime method from parkingSelectedSpotService', () => {
      const changes: SimpleChanges = { change: { previousValue: null, currentValue: null, firstChange: true, isFirstChange: null } };
      component.ngOnChanges(changes);

      fixture.detectChanges();

      expect(parkingSelectedSpotService.getDriverCheckInTime).toHaveBeenCalled();
    })

    it('should call getDriverTimeSpend method from parkingSelectedSpotService when driver exists', () => {
      const changes: SimpleChanges = { driver: { previousValue: null, currentValue: '', firstChange: true, isFirstChange: null } };
      component.ngOnChanges(changes);

      fixture.detectChanges();

      expect(parkingSelectedSpotService.getDriverTimeSpend).toHaveBeenCalled();
    })

    it('should not call getDriverTimeSpend method from parkingSelectedSpotService when driver does not exists', () => {
      const changes: SimpleChanges = { change: { previousValue: null, currentValue: '', firstChange: true, isFirstChange: null } };
      component.ngOnChanges(changes);

      fixture.detectChanges();

      expect(parkingSelectedSpotService.getDriverTimeSpend).not.toHaveBeenCalled();
    })
  })

  describe('the *changeSlotStatus* method', () => {
    it('should call markAsTouched method', () => {
      spyOn(component.profileForm, 'markAsTouched');
      const active = true;

      component.changeSlotStatus(active);

      expect(component.profileForm.markAsTouched).toHaveBeenCalled();
    })

    it('should not call changeSlotStatus from parkingSelectedSpotService when active is true and profile form is not valid', () => {
      const active = true;

      component.changeSlotStatus(active);

      expect(parkingSelectedSpotService.changeSlotStatus).not.toHaveBeenCalled();
    })
  })

  describe('the *resetProfileForm* method', () => {
    it('should call reset method from profileForm', () => {
      spyOn(component.profileForm, 'reset');

      component.resetProfileForm();

      expect(component.profileForm.reset).toHaveBeenCalled();
    })
  });

  describe('the *displayFormControlError* method', () => {
    it('should call displayFormControlError method from parkingSelectedSpotService with formControlName', () => {
      const formControlName = 'carPlate';

      component.displayFormControlError(formControlName);

      expect(parkingSelectedSpotService.displayFormControlError).toHaveBeenCalledWith(component.profileForm, formControlName);
    })
  })
})
