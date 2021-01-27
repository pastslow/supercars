import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Spot } from '@app/feature/parking/interfaces/spot.interface';
import { Parking } from '@app/feature/parking/interfaces/parking.interface';
import { ParkingArea } from '@app/feature/parking/interfaces/parking-area.interface';
import { ParkingDriver } from '@app/feature/parking/interfaces/parking-driver.interface';

import { ParkingService } from '@app/feature/parking/services/parking.service';
import { ParkingApiService } from '@app/feature/parking/services/parking-api-service';
import { SlotModel } from '@app/feature/parking/interfaces/slot-model.interface';
import { ViewMode } from '@app/feature/parking/enums/view-mode.enum';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss'],
})
export class TerrainComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public parking: Parking;
  @Input() public selectedParkingLevelIndex: number;
  @Input() public selectedParkingAreaIndex: number;
  @Input() public parkingViewMode: number;
  @Input() public selectedSlotModel: SlotModel;

  public terrainSizeRow: Array<number>;
  public terrainSizeCol: Array<number>;
  public driver: ParkingDriver;
  public selectedSpot: Spot;
  public selectedParkingArea: ParkingArea;
  public parkingPlacements: Spot[];
  public isEditModeEnabled: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private parkingService: ParkingService,
    private parkingApiService: ParkingApiService
  ) {}

  public ngOnInit(): void {
    if (this.parking) {
      this.updateSelectedParking();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.parkingViewMode) {
      this.isEditModeEnabled = this.parkingViewMode === ViewMode.edit;
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

    return this.parkingService.getSelectedCell(
      coordinate,
      this.parkingPlacements
    );
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

    this.parkingApiService
      .getDriverFromSelectedSpot(this.selectedSpot.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        this.driver = response.drivers[0];
      });
  }

  public updateSelectedParking(): void {
    const parkingFloor = this.parking.levels[this.selectedParkingLevelIndex];
    this.selectedParkingArea =
      parkingFloor.areas[this.selectedParkingAreaIndex];
    this.terrainSizeRow = new Array(this.selectedParkingArea.sizeY);
    this.terrainSizeCol = new Array(this.selectedParkingArea.sizeX);
    this.parkingPlacements = this.selectedParkingArea.spots;
  }
}
