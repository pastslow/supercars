import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingLevel } from '@app/shared/interfaces/parking-level.interface';

import { ParkingService } from '@app/shared/services/parking.service';
import { SpinnerService } from '@app/shared/services/spinner-service';

@Component({
  selector: 'app-parking-items',
  templateUrl: './parking-items.component.html',
  styleUrls: ['./parking-items.component.scss'],
})
export class ParkingItemsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public parkings: Parking[];
  @Output() public getSelectedParking = new EventEmitter();

  public hasAnyParkingsCreated: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private parkingService: ParkingService,
    private spinnerService: SpinnerService
  ) {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.parkings && changes.parkings.currentValue) {
      this.displayCreateParking();
    }
  }

  public editSelectedParking(selectedParking: Parking): void {
    this.spinnerService.makeSpinnerVisible();
    this.parkingService
      .getSelectedParkingLevels(selectedParking)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.spinnerService.hideSpinner();
        })
      )
      .subscribe((parkingLevels: ParkingLevel[]) => {
        selectedParking.levels = parkingLevels;
        this.getSelectedParking.emit(selectedParking);
        this.spinnerService.hideSpinner();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private displayCreateParking(): void {
    this.hasAnyParkingsCreated = this.parkings.length > 0;
  }
}
