import { Spot } from '@app/shared/interfaces/spot.interface';

export class ParkingServiceMock {
  constructor() { };

  public static getParkingPlacements(): Spot[] {
    const parkingPlacements: Spot[] = [
      {
        x: 0,
        y: 0,
        id: 0,
        orientation: 'clock-whise',
        border: 'left',
        active: 1,
        memberId: 'test1',
        indicator: 1
      },
      {
        x: 1,
        y: 1,
        id: 1,
        orientation: 'clock-whise',
        border: 'left',
        active: 1,
        memberId: 'test1',
        indicator: 1
      },
      {
        x: 2,
        y: 2,
        id: 2,
        orientation: 'clock-whise',
        border: 'left',
        active: 1,
        memberId: 'test1',
        indicator: 1
      }
    ]

    return parkingPlacements;
  }
}
