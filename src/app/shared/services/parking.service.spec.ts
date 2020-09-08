import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs';

import { ParkingService } from '@app/shared/services/parking.service'
import { ParkingApiService } from '@app/shared/services/parking-api-service'
import { ParkingServiceMock } from '@app/shared/test-data/parking-service-mock';

describe('the Parking Service', () => {
  let service: jasmine.SpyObj<any>;
  let parkingApiService: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ParkingService,
        { provide: ParkingApiService, useValue: jasmine.createSpyObj('ParkingApiService', ['getSelectedParkingEntries', 'getSelectedParkingAreas', 'getAreaParkingSlots']) }
      ]
    })

    parkingApiService = TestBed.inject(ParkingApiService);
    service = TestBed.inject(ParkingService);
  })


  describe('the *getSelectedCell* method', () => {
    it('should return selected cell from parkingPlacements', () => {
      const coordinates = { x: 0, y: 0 };
      const parkingPlacements = ParkingServiceMock.getParkingPlacements();

      const selectedCell = service.getSelectedCell(coordinates, parkingPlacements)

      expect(selectedCell).toEqual(parkingPlacements[0]);
    })
  });

  describe('the *getSelectedParkingLevels* method', () => {
    it('should call getSelectedParkingEntries method from parkingApiService', () => {
      parkingApiService.getSelectedParkingEntries.and.returnValue(of({ entries: [{ id: 1 }] }));
      parkingApiService.getSelectedParkingAreas.and.returnValue(of({ areas: [{ id: 1 }] }));
      parkingApiService.getAreaParkingSlots.and.returnValue(of({ spots: [{ id: 1 }] }));

      service.getSelectedParkingLevels(0).subscribe(() => {
        expect(parkingApiService.getSelectedParkingEntries).toHaveBeenCalled();
      });
    })

    it('should call getSelectedParkingAreas method from parkingApiService', () => {
      parkingApiService.getSelectedParkingEntries.and.returnValue(of({ entries: [{ id: 1 }] }));
      parkingApiService.getSelectedParkingAreas.and.returnValue(of({ areas: [{ id: 1 }] }));
      parkingApiService.getAreaParkingSlots.and.returnValue(of({ spots: [{ id: 1 }] }));

      service.getSelectedParkingLevels(0).subscribe(() => {
        expect(parkingApiService.getSelectedParkingAreas).toHaveBeenCalled();
      });
    })

    it('should call getAreaParkingSlots method from parkingApiService', () => {
      parkingApiService.getSelectedParkingEntries.and.returnValue(of({ entries: [{ id: 1 }] }));
      parkingApiService.getSelectedParkingAreas.and.returnValue(of({ areas: [{ id: 1 }] }));
      parkingApiService.getAreaParkingSlots.and.returnValue(of({ spots: [{ id: 1 }] }));

      service.getSelectedParkingLevels(0).subscribe(() => {
        expect(parkingApiService.getAreaParkingSlots).toHaveBeenCalled();
      });
    })
  });
})
