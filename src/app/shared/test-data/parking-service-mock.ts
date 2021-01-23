import { FormGroup, FormControl } from '@angular/forms';

import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingLevel } from '@app/shared/interfaces/parking-level.interface';

export class ParkingServiceMock {
  constructor() {}

  public static getParking(): Parking {
    const parkings = {
      id: '0',
      name: 'Test1',
      address: 'Area test',
      totalLevels: 1,
      totalSpots: 1,
      freeSpots: 1,
      usedSpots: 0,
      startDate: '',
      endDate: '',
      userId: 1,
      levels: [
        {
          areas: [
            {
              id: '0',
              name: 'Area 1',
              sizeY: 10,
              sizeX: 20,
              parkingEntriesId: '1',
              totalSpots: 52,
              freeSpots: 52,
              usedSpots: 0,
              parkingId: '',
              spots: [
                {
                  id: 0,
                  y: 1,
                  x: 1,
                  orientation: 'clockwise-cell',
                  border: '',
                  active: 1,
                  indicator: 1,
                  parkingAreaId: '1',
                  parkingId: '',
                },
              ],
            },
          ],
          id: '0',
          name: 'Parter',
          parkingId: '',
          status: '',
        },
      ],
      parkingType: '',
    };

    return parkings;
  }

  public static getSelectedParkingLevels(): ParkingLevel[] {
    const parkingLevels = [
      {
        areas: null,
        id: '0',
        name: 'Level 0',
        parkingId: 'Empty',
        status: '',
      },
    ];

    return parkingLevels;
  }

  public static getParkingPlacements(): Spot[] {
    const parkingPlacements: Spot[] = [
      {
        x: 0,
        y: 0,
        id: 0,
        orientation: 'clockwise-cell',
        border: 'left',
        active: 1,
        indicator: 1,
        parkingAreaId: '1',
        parkingId: '',
      },
      {
        x: 1,
        y: 1,
        id: 1,
        orientation: 'clockwise-cell',
        border: 'left',
        active: 1,
        indicator: 1,
        parkingAreaId: '1',
        parkingId: '',
      },
      {
        x: 2,
        y: 2,
        id: 2,
        orientation: 'clockwise-cell',
        border: 'left',
        active: 1,
        indicator: 1,
        parkingAreaId: '1',
        parkingId: '',
      },
    ];

    return parkingPlacements;
  }

  public static getDriverFormGroup(): FormGroup {
    const formGroup: FormGroup = new FormGroup({
      driverName: new FormControl('test'),
      carPlate: new FormControl('IS 22 TST'),
      phoneNumber: new FormControl('021 021 021'),
      date: new FormControl('2020.08.22 10:00 am'),
    });

    return formGroup;
  }

  public static getDriver(spotId: number): ParkingDriver {
    const driver = {
      name: 'test',
      carPlate: 'IS 22 TST',
      phoneNumber: '021 021 021',
      date: '2020.08.22 10:00 am',
      parkingSpotId: spotId,
    };

    return driver;
  }

  public static getSpotWithCustomOrientation(spotOrientation: string): Spot {
    const spot = {
      id: 0,
      y: 1,
      x: 1,
      orientation: spotOrientation,
      border: '',
      active: 1,
      indicator: 1,
      parkingAreaId: '1',
      parkingId: '',
    };

    return spot;
  }
}
