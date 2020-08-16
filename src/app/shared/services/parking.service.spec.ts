import { TestBed } from '@angular/core/testing'

import { ParkingServiceMock } from '@app/shared/test-data/parking-service-mock';

import { ParkingService } from '@app/shared/services/parking.service'
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('the PracticeService', () => {
  let parkingService: ParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ParkingService, useValue: jasmine.createSpyObj('ParkingService', ['getSelectedCell', 'getParking', 'getSelectedParkingEntries', 'getSelectedParkingAreas', 'getAreaParkingSlots', 'changeSlotStatus']) }
      ],
      imports: [HttpClientTestingModule]
    })
  })

  parkingService = TestBed.inject(ParkingService);

  describe('the *getSelectedCell* method', () => {
    it('should return selected cell from parkingPlacements', () => {
      const coordinates = { x: 0, y: 0 };
      const parkingPlacements = ParkingServiceMock.getParkingPlacements();

      const selectedCell = parkingService.getSelectedCell(coordinates, parkingPlacements)

      expect(selectedCell).toEqual(parkingPlacements[0]);
    })
  })
})
