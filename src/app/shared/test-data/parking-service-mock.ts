import { FormGroup, FormControl } from '@angular/forms';

import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';

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
        indicator: 1,
        parkingAreaId: 1
      },
      {
        x: 1,
        y: 1,
        id: 1,
        orientation: 'clock-whise',
        border: 'left',
        active: 1,
        indicator: 1,
        parkingAreaId: 1
      },
      {
        x: 2,
        y: 2,
        id: 2,
        orientation: 'clock-whise',
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
}
