import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { mergeMap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import * as moment from 'moment';

import { SharedConstants } from '@app/shared/constants/shared-constants';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';
import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';

import { ParkingApiService } from '@app/shared/services/parking-api-service';
import { ParkingService } from '@app/shared/services/parking.service';

@Injectable()
export class ParkingSelectedSpotService {
  constructor(private parkingApiService: ParkingApiService, private parkingService: ParkingService) { }

  public changeSlotStatus
    (selectedSpot: Spot, isSlotActive: number, selectedArea: ParkingArea, formGroupName: FormGroup): Observable<void> {
    return this.parkingApiService.changeSlotStatus(selectedSpot.id, isSlotActive).pipe(
      mergeMap(() => {
        if (isSlotActive === 1) {
          const driver = this.getDriverInfo(formGroupName, selectedSpot);
          return this.parkingApiService.addDriverToSelectedSpot(driver);
        }

        return of(true)
      }),
      mergeMap(() => {
        if (isSlotActive === 0) {
          return this.parkingApiService.deleteDriver(selectedSpot.id);
        }

        return of(true);
      }),
      map(() => {
        selectedSpot.active = isSlotActive;
        this.parkingService.getSelectedAreaSpotsByStatus(selectedArea);
      }),
    )
  }

  public displayFormControlError(formGroupName: FormGroup, formControlName: string): boolean {
    const isFormControlErrorDisplayed = !formGroupName.controls[formControlName].valid && formGroupName.touched;

    return isFormControlErrorDisplayed
  }

  public getDriverCheckInTime(): string {
    return moment().format(SharedConstants.dateLongFormat);
  }

  public getDriverTimeSpend(driver: ParkingDriver): string {
    if (!driver) {
      return '';
    }

    const startDay = moment(driver.check_in);
    const currentDay = moment();

    const duration = moment.duration(moment(currentDay).diff(startDay))

    const days = Math.floor(duration.asDays());
    const daysFormatted = days <= 0 ? '' : `${days}d `;

    const hours = duration.hours();
    const hoursFormatted = hours <= 0 ? '' : `${hours}h `;

    const minutes = duration.minutes();
    const minutesFormatted = `${minutes}m`;

    return [daysFormatted, hoursFormatted, minutesFormatted].join('');
  }

  private getDriverInfo(formGroupName: FormGroup, selectedSpot: Spot): ParkingDriver {
    const driver = {
      name: formGroupName.controls.driverName.value,
      carPlate: formGroupName.controls.carPlate.value,
      phoneNumber: formGroupName.controls.phoneNumber.value,
      date: formGroupName.controls.date.value,
      parkingSpotId: selectedSpot.id,
    }

    return driver;
  }
}
