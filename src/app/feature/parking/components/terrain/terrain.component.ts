import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-area.interface';
import { ParkingDriver } from '@app/shared/interfaces/parking-driver.interface';
import { HttpResponse } from '@app/shared/interfaces/http-response.interface';

import { ParkingService } from '@app/shared/services/parking.service';
import { ParkingApiService } from '@app/shared/services/parking-api-service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit, OnDestroy {
  @Input() public parkingData: ParkingData;
  @Input() public parking: Parking;

  public terrainSizeRow: Array<number>;
  public terrainSizeCol: Array<number>;
  public driver: ParkingDriver;
  public selectedSpot: Spot;
  public selectedArea: ParkingArea;
  public parkingPlacements: Spot[];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private parkingService: ParkingService,
    private parkingApiService: ParkingApiService) { }

  public ngOnInit(): void {
    if (this.parking) {
      this.updateSelectedParking(this.parking);
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getSelectedCell(coordinateY: number, coordinateX: number): Spot {
    const coordinate = {
      x: coordinateX,
      y: coordinateY
    };

    return this.parkingService.getSelectedCell(coordinate, this.parkingPlacements);
  }

  public isBlockCell(coordinateY: number, coordinateX: number): boolean {
    const selectedCell = this.getSelectedCell(coordinateY, coordinateX);

    if (selectedCell) {
      return selectedCell.orientation === 'block-cell' ? true : false;
    }
  }

  public getCellData(coordinateY: number, coordinateX: number, selectedData: string): any {
    const selectedCell = this.getSelectedCell(coordinateY, coordinateX);
    if (selectedCell) {
      if (selectedCell[selectedData] !== undefined) {
        return selectedCell[selectedData];
      }
    }
  }

  public getSelectedSpot(coordinateY: number, coordinateX: number): void {
    this.selectedSpot = this.parkingPlacements.find(spot => spot.x === coordinateX && spot.y === coordinateY);

    this.parkingApiService.getDriverFromSelectedSpot(this.selectedSpot.id).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((response: HttpResponse) => {
      this.driver = response.drivers[0];
    })
  }

  public updateSelectedParking(parking: Parking): void {
    const parkingFloor = parking.levels.find(floor => floor.name === this.parkingData.selectedFloor)
    this.selectedArea = parkingFloor.areas.find(area => area.name === this.parkingData.selectedArea);
    this.parkingService.getSelectedAreaSpotsByStatus(this.selectedArea);
    this.terrainSizeRow = new Array(this.selectedArea.size_y);
    this.terrainSizeCol = new Array(this.selectedArea.size_x);
    this.parkingPlacements = this.selectedArea.spots;
  }
}
