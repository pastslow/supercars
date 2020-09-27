import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ParkingStatusComponent } from '@app/feature/parking/components/parking-status/parking-status.component'

import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingService } from '@app/shared/services/parking.service';
import { ParkingServiceMock } from '@app/shared/test-data/parking-service-mock';

describe('ParkingStatusComponent', () => {
  let component: ParkingStatusComponent;
  let fixture: ComponentFixture<ParkingStatusComponent>;
  let parkingService: jasmine.SpyObj<any>;
  let parkingApiService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ParkingStatusComponent
      ],
      providers: [
        { provide: ParkingService, useValue: jasmine.createSpyObj('ParkingService', ['getParkingAreaStatus$']) },
        { provide: ParkingApiService, useValue: jasmine.createSpyObj('ParkingApiService', ['updateParkingSpotsNumbers']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingStatusComponent);
    component = fixture.componentInstance;
    parkingService = TestBed.inject(ParkingService);
    parkingApiService = TestBed.inject(ParkingApiService);
  })

  describe('OnInit', () => {
    it('should call getParkingAreaStatus$ method from parkingService', () => {
      const parking = ParkingServiceMock.getParking();
      component.parkings = [parking];
      const parkingAreaStatus = ParkingServiceMock.getParkingAreaStatus();
      parkingApiService.updateParkingSpotsNumbers.and.returnValue(of(null));
      parkingService.getParkingAreaStatus$.and.returnValue(of(parkingAreaStatus));

      fixture.detectChanges();

      expect(parkingService.getParkingAreaStatus$).toHaveBeenCalled();
    })

    it('should call updateParkingSpotsNumbers method from parkingApiService', () => {
      const parking = ParkingServiceMock.getParking();
      component.parkings = [parking];
      const parkingAreaStatus = ParkingServiceMock.getParkingAreaStatus();
      parkingApiService.updateParkingSpotsNumbers.and.returnValue(of(null));
      parkingService.getParkingAreaStatus$.and.returnValue(of(parkingAreaStatus));

      fixture.detectChanges();

      expect(parkingApiService.updateParkingSpotsNumbers).toHaveBeenCalled();
    })

    it('should not call updateParkingSpotsNumbers method from parkingApiService when parkingId does not exists', () => {
      const parking = ParkingServiceMock.getParking();
      component.parkings = [parking];
      const parkingAreaStatus = ParkingServiceMock.getParkingAreaStatus();
      delete parkingAreaStatus.parkingId;
      parkingService.getParkingAreaStatus$.and.returnValue(of(parkingAreaStatus));

      fixture.detectChanges();

      expect(parkingApiService.updateParkingSpotsNumbers).not.toHaveBeenCalled();
    })
  })
})
