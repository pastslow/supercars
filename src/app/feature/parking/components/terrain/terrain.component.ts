import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Spot } from '@app/feature/parking/interfaces/spot.interface';
import { Parking } from '@app/feature/parking/interfaces/parking.interface';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { ParkingDriver } from '@app/feature/parking/interfaces/parking-driver.interface';

import { SlotModel } from '@app/feature/parking/interfaces/slot-model.interface';
import { ViewMode } from '@app/feature/parking/enums/view-mode.enum';
import { ParkingFacadeService } from '@app/feature/parking/services/parking-facade-service.service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss'],
})
export class TerrainComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public parking: Parking;
  @Input() public selectedParkingArea: ParkingArea;
  @Input() public parkingViewMode: number;
  @Input() public selectedSlotModel: SlotModel;

  public terrainSizeRow: Array<number>;
  public terrainSizeCol: Array<number>;
  public driver: ParkingDriver;
  public selectedSpot: Spot;
  public parkingPlacements: Spot[];
  public isEditModeEnabled: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private parkingFacadeService: ParkingFacadeService) {}

  public ngOnInit(): void {
    if (this.parking) {
      this.updateSelectedParking();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.parkingViewMode) {
      this.isEditModeEnabled = this.parkingViewMode === ViewMode.edit;
    }

    if (changes && changes.selectedParkingArea) {
      this.updateSelectedParking();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getSelectedCell(coordinateY: number, coordinateX: number): Spot {
    const coordinate = {
      x: coordinateX,
      y: coordinateY,
    };

    const selectedCell = this.parkingPlacements.find(
      (spot) => spot.x === coordinate.x && spot.y === coordinate.y
    );
    return selectedCell;
  }

  public isBlockCell(coordinateY: number, coordinateX: number): boolean {
    const selectedCell = this.getSelectedCell(coordinateY, coordinateX);

    if (selectedCell) {
      return selectedCell.orientation === 'block-cell' ? true : false;
    }
  }

  public getCellData(
    coordinateY: number,
    coordinateX: number,
    selectedData: string
  ): any {
    const selectedCell = this.getSelectedCell(coordinateY, coordinateX);
    if (selectedCell) {
      if (selectedCell[selectedData] !== undefined) {
        return selectedCell[selectedData];
      }
    }
  }

  public getSelectedSpot(coordinateY: number, coordinateX: number): void {
    if (this.isEditModeEnabled) {
      return;
    }

    this.selectedSpot = this.parkingPlacements.find(
      (spot) => spot.x === coordinateX && spot.y === coordinateY
    );

    this.parkingFacadeService
      .getDriverFromSelectedSpot(this.selectedSpot)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((driver: ParkingDriver) => {
        this.driver = driver;
      });
  }

  public updateSelectedParking(): void {
    this.terrainSizeRow = new Array(this.selectedParkingArea.sizeY);
    this.terrainSizeCol = new Array(this.selectedParkingArea.sizeX);
    this.parkingPlacements = this.selectedParkingArea.spots;
  }
}
