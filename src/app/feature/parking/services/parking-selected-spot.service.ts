import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import * as moment from 'moment';

import { ParkingModels } from '@app/feature/parking/constants/parking-models.constants';
import { Spot } from '@app/feature/parking/interfaces/spot.interface';
import { ParkingDriver } from '@app/feature/parking/interfaces/parking-driver.interface';

import { ParkingFacadeService } from '@app/feature/parking/services/parking-facade-service.service';
import { ParkingSlotStatus } from '@app/feature/parking/enums/parking-slot-status.enum';

@Injectable()
export class ParkingSelectedSpotService {
  constructor(private parkingFacadeService: ParkingFacadeService) {}

  public changeSlotStatus(
    selectedSpot: Spot,
    isSlotActive: number,
    formGroupName: FormGroup
  ): Observable<boolean> {
    let driver: ParkingDriver;

    if (isSlotActive === ParkingSlotStatus.active) {
      driver = this.getDriverInfo(formGroupName, selectedSpot);
    }

    return this.parkingFacadeService.changeSlotStatus(
      selectedSpot,
      isSlotActive,
      driver
    );
  }

  public displayFormControlError(
    formGroupName: FormGroup,
    formControlName: string
  ): boolean {
    const isFormControlErrorDisplayed =
      !formGroupName.controls[formControlName].valid && formGroupName.touched;

    return isFormControlErrorDisplayed;
  }

  public getDriverCheckInTime(): string {
    return moment().format(ParkingModels.dateLongFormat);
  }

  public getDriverTimeSpend(driver: ParkingDriver): string {
    if (!driver) {
      return '';
    }

    const startDay = moment(driver.check_in);
    const currentDay = moment();

    const duration = moment.duration(moment(currentDay).diff(startDay));

    const days = Math.floor(duration.asDays());
    const daysFormatted = days <= 0 ? '' : `${days}d `;

    const hours = duration.hours();
    const hoursFormatted = hours <= 0 ? '' : `${hours}h `;

    const minutes = duration.minutes();
    const minutesFormatted = `${minutes}m`;

    return [daysFormatted, hoursFormatted, minutesFormatted].join('');
  }

  private getDriverInfo(
    formGroupName: FormGroup,
    selectedSpot: Spot
  ): ParkingDriver {
    const parking = this.parkingFacadeService.getParkingStateValue();

    const driver = {
      name: formGroupName.controls.driverName.value,
      carPlate: formGroupName.controls.carPlate.value,
      phoneNumber: formGroupName.controls.phoneNumber.value,
      date: formGroupName.controls.date.value,
      parkingSpotId: selectedSpot.id,
      parkingId: parking.id,
    } as ParkingDriver;

    return driver;
  }
}
