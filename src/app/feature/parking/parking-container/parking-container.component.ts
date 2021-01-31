import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, finalize, take, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Parking } from '@app/feature/parking/interfaces/parking.interface';

import { ParkingFacadeService } from '@app/feature/parking/services/parking-facade-service.service';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { SpinnerService } from '@app/core/services/spinner-service';
import { ParkingLevel } from '@app/feature/parking/interfaces/parking-level.interface';
import { ParkingModels } from '@app/feature/parking/constants/parking-models.constants';
import { ViewMode } from '@app/feature/parking/enums/view-mode.enum';
import { SlotModel } from '@app/feature/parking/interfaces/slot-model.interface';

@Component({
  selector: 'app-parking-container',
  templateUrl: './parking-container.component.html',
  styleUrls: ['./parking-container.component.scss'],
})
export class ParkingContainerComponent implements OnInit, OnDestroy {
  public displayParkingZone: boolean;
  public parkings: Parking[];
  public selectedParking: Parking;
  public selectedParkingLevelIndex = 0;
  public selectedParkingAreaIndex = 0;
  public parkingViewMode: number;
  public viewModes = ViewMode;
  public selectedSlotModel: SlotModel;

  public selectedParkingArea: ParkingArea;

  private unsubscribe$: Subject<void> = new Subject();
  parkingModels: any;

  constructor(
    private parkingFacadeService: ParkingFacadeService,
    private spinnerService: SpinnerService
  ) {}

  public ngOnInit(): void {
    this.listenToModelChanges();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public backToParkings(): void {
    this.displayParkingZone = false;
    this.parkingFacadeService.updateTemporaryAreaSpotsState([]);
    this.getAllUserParkings();
  }

  public editSelectedParking(selectedParking: Parking): void {
    this.spinnerService.makeSpinnerVisible();
    this.parkingFacadeService
      .getSelectedParkingLevels(selectedParking)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.spinnerService.hideSpinner();
        })
      )
      .subscribe((parkingLevels: ParkingLevel[]) => {
        selectedParking.levels = parkingLevels;
        this.parkingFacadeService.updateParkingState(selectedParking);
        this.parkingFacadeService.updateSelectedParkingLevelIndex(0);
        this.spinnerService.hideSpinner();
      });
  }

  public deleteSelectedParking(selectedParking: Parking): void {
    this.spinnerService.makeSpinnerVisible();
    this.parkingFacadeService
      .deleteSelectedParking(selectedParking.id)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.spinnerService.hideSpinner();
        }),
        tap(() => {
          this.getAllUserParkings();
        })
      )
      .subscribe();
  }

  public changeParkingViewMode(parkingViewMode: number): void {
    this.parkingViewMode = parkingViewMode;
  }

  public createParking(selectedParkingModelIndex: number): void {
    const parkingName =
      ParkingModels.defaultModels[selectedParkingModelIndex].name;
    const parkingModel = ParkingModels.parkingModels.find(
      (parking) => parking.name === parkingName
    );

    this.spinnerService.makeSpinnerVisible();
    this.parkingFacadeService
      .createParking(parkingModel)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.spinnerService.hideSpinner();
        }),
        tap(() => {
          this.getAllUserParkings();
        })
      )
      .subscribe();
  }

  public changeSelectedSpotModel(slotModel: SlotModel): void {
    this.selectedSlotModel = slotModel;
  }

  public saveAreaChanges(): void {
    this.spinnerService.makeSpinnerVisible();
    this.parkingFacadeService
      .saveAreaChanges()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.spinnerService.hideSpinner();
      });
  }

  private listenToModelChanges(): void {
    this.getAllUserParkings();

    this.parkingFacadeService
      .getParkingAreaState$()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((area) => area !== null)
      )
      .subscribe((parkingArea: ParkingArea) => {
        this.selectedParkingArea = Object.assign({}, parkingArea);
      });

    this.parkingFacadeService
      .getParkingState$()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((parking: Parking) => {
          if (!parking) {
            return;
          }

          this.selectedParking = parking;
          this.selectedParkingArea = this.selectedParking.levels[
            this.selectedParkingLevelIndex
          ].areas[this.selectedParkingAreaIndex];

          this.displayParkingZone = true;
          this.parkingFacadeService.updateParkingAreaState(
            this.selectedParkingArea
          );
        })
      )
      .subscribe();
  }

  private getAllUserParkings(): void {
    this.parkingFacadeService
      .getAllUserParkings()
      .pipe(takeUntil(this.unsubscribe$), take(1))
      .subscribe((response: Parking[]) => {
        this.parkingViewMode = this.viewModes.view;
        if (response) {
          this.parkings = response;
        }
      });
  }
}
