import { FormGroup, FormControl } from '@angular/forms';

import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { ParkingLevel } from '@app/shared/interfaces/parking-level.interface';
import { ParkingAreaStatus } from '@app/shared/interfaces/parking-area-status.interface';

export class ParkingServiceMock {
  constructor() { };

  public static getParking(): Parking {
    const parkings =
    {
      id: 0,
      name: 'Test1',
      address: 'Area test',
      total_levels: 1,
      total_spots: 1,
      free_spots: 1,
      used_spots: 0,
      start_date: '',
      end_date: '',
      user_id: 1,
      levels: [{
        areas: [
          {
            id: 0,
            name: 'Area 1',
            size_y: 10,
            size_x: 20,
            parking_entries_id: 1,
            spots: [{
              id: 0,
              y: 1,
              x: 1,
              orientation: 'clockwise-cell',
              border: '',
              active: 1,
              indicator: 1,
              parkingAreaId: 1
            }],
          }
        ],
        id: 0,
        name: 'Parter',
        parking_id: '',
        status: '',
      }]
    }

    return parkings;
  }

  public static getSelectedParkingLevels(): ParkingLevel[] {
    const parkingLevels = [
      {
        areas: null,
        id: 0,
        name: 'Level 0',
        parking_id: 'Empty',
        status: '',
      }
    ]

    return parkingLevels;
  }

  public static getParkingData(): ParkingData {
    const parkingData = {
      selectedArea: 'Area 1',
      selectedFloor: 'Parter',
    }

    return parkingData;
  }

  public static getParkingAreaStatus(): ParkingAreaStatus {
    const parkingAreaStatus = {
      parkingId: 0,
      totalSpots: 50,
      usedSpots: 3,
      unusedSpots: 47,
    }

    return parkingAreaStatus;
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
        parkingAreaId: 1
      },
      {
        x: 1,
        y: 1,
        id: 1,
        orientation: 'clockwise-cell',
        border: 'left',
        active: 1,
        indicator: 1,
        parkingAreaId: 1
      },
      {
        x: 2,
        y: 2,
        id: 2,
        orientation: 'clockwise-cell',
        border: 'left',
        active: 1,
        indicator: 1,
        parkingAreaId: 1
      }
    ]

    return parkingPlacements;
  }

  public static getDriverFormGroup(): FormGroup {
    const formGroup: FormGroup = new FormGroup({
      driverName: new FormControl('test'),
      carPlate: new FormControl('IS 22 TST'),
      phoneNumber: new FormControl('021 021 021'),
      date: new FormControl('2020.08.22 10:00 am')
    })

    return formGroup;
  }

  public static getDriver(spotId: number): ParkingDriver {
    const driver = {
      name: 'test',
      carPlate: 'IS 22 TST',
      phoneNumber: '021 021 021',
      date: '2020.08.22 10:00 am',
      parkingSpotId: spotId
    }

    return driver
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
      parkingAreaId: 1
    }

    return spot;
  }
}
