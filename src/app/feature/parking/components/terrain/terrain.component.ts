import { Component, OnInit, Input } from '@angular/core';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { ParkingArea } from '@app/shared/interfaces/parking-spot.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';
import { Parking } from '@app/shared/interfaces/parking.interface';

import { ParkingService } from '@app/shared/services/parking.service';
import { SdkParkingService } from '@app/shared/services/sdk-parking.service';
import { takeUntil, map } from 'rxjs/operators';
import { HttpResponse } from '@app/shared/interfaces/http-response.interface';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit {
  public terrainSizeRow: Array<number>;
  public terrainSizeCol: Array<number>;
  public driver;

  public selectedSpot: Spot;
  public parkingData: ParkingData;

  public selectedArea: ParkingArea;
  public parkingPlacements: Spot[];

  @Input() public parking: Parking;

  constructor(
    private parkingService: ParkingService,
    private sdkParkingService: SdkParkingService) { }

  public ngOnInit(): void {
    this.parkingData = this.parkingService.parkingData;

    if (this.parking) {
      this.getSelectedArea(this.parking);
    }
  }

  public updateParkingPlacements(coordinateY: number, coordinateX: number): Spot {
    const coordinate = {
      x: coordinateX,
      y: coordinateY
    };

    return this.parkingService.getSelectedCell(coordinate, this.parkingPlacements);
  }

  public updateCell(coordinateY: number, coordinateX: number): boolean {
    const selectedCell = this.updateParkingPlacements(coordinateY, coordinateX);

    if (selectedCell) {
      return selectedCell.orientation === 'block-cell' ? true : false;
    }
  }

  public getCellData(coordinateY: number, coordinateX: number, selectedData: string) {
    const selectedCell = this.updateParkingPlacements(coordinateY, coordinateX);
    if (selectedCell) {
      if (selectedCell[selectedData] !== undefined) {
        return selectedCell[selectedData];
      }
    }
  }

  public getSelectedSpot(coordinateY: number, coordinateX: number): void {
    this.selectedSpot = this.parkingPlacements.find(spot => spot.x === coordinateX && spot.y === coordinateY);

    this.sdkParkingService.getDriverFromSelectedSpot(this.selectedSpot.id).pipe(
      map((response: HttpResponse) => {
        this.driver = response.drivers[0];
      })
    ).subscribe()
  }

  public getSelectedArea(parking): void {
    const parkingFloor = parking.levels.find(floor => floor.name === this.parkingData.selectedFloor)
    this.selectedArea = parkingFloor.areas.find(area => area.name === this.parkingData.selectedArea);
    this.parkingService.getSelectedAreaSpotsByStatus(this.selectedArea);
    this.terrainSizeRow = new Array(this.selectedArea.size_y);
    this.terrainSizeCol = new Array(this.selectedArea.size_x);
    this.parkingPlacements = this.selectedArea.spots;
  }
}
