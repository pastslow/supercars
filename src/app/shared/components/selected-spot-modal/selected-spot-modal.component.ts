import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Spot } from '@app/shared/interfaces/spot.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';
import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';

import { ParkingSelectedSpotService } from '@app/shared/services/parking-selected-spot.service';
import { ParkingSlotStatus } from '@app/shared/enums/parking-slot-status.enum';

@Component({
  selector: 'app-selected-spot-modal',
  templateUrl: './selected-spot-modal.component.html',
  styleUrls: ['./selected-spot-modal.component.scss']
})
export class SelectedSpotModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public selectedSpot: Spot;
  @Input() public selectedArea: ParkingArea;
  @Input() public driver: ParkingDriver;
  @ViewChild('close') private closeButton: ElementRef;

  public profileForm: FormGroup = new FormGroup({
    driverName: new FormControl(''),
    carPlate: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    date: new FormControl(''),
  });

  public driverTimeSpend = '';

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private parkingSelectedSpotService: ParkingSelectedSpotService) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.updateDriverCheckInTime();

    if (changes.driver) {
      this.updateDriverTimeSpend();
    }
  }

  public changeSlotStatus(active: boolean): void {
    this.profileForm.markAsTouched();

    const isSlotActive = active ? ParkingSlotStatus.active : ParkingSlotStatus.inactive;

    if (isSlotActive === ParkingSlotStatus.active && !this.profileForm.valid) {
      return;
    }

    this.parkingSelectedSpotService.changeSlotStatus(this.selectedSpot, isSlotActive, this.selectedArea, this.profileForm).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.resetProfileForm();
      this.closeButton.nativeElement.click();
    })
  }

  public resetProfileForm(): void {
    this.profileForm.reset();
  }

  public displayFormControlError(formControlName: string): boolean {
    return this.parkingSelectedSpotService.displayFormControlError(this.profileForm, formControlName);
  }

  private updateDriverCheckInTime(): void {
    const driverCheckInTime = this.parkingSelectedSpotService.getDriverCheckInTime();
    this.profileForm.controls.date.patchValue(driverCheckInTime);
  }

  private updateDriverTimeSpend(): void {
    this.driverTimeSpend = this.parkingSelectedSpotService.getDriverTimeSpend(this.driver);
  }
}
