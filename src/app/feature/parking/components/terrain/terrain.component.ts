import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

import { ParkingData } from '@app/shared/interfaces/parking-data.interface';
import { ParkingSpot } from '@app/shared/interfaces/parking-spot.interface';
import { Spot } from '@app/shared/interfaces/spot.interface';

import { ParkingService } from '@app/shared/services/parking.service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit {
  public terrainSizeRow: Array<number>;
  public terrainSizeCol: Array<number>;

  public selectedSpot: Spot;
  public parkingData: ParkingData;

  public parkingArea: ParkingSpot;
  public parkingPlacements: Spot[];

  @Input() public parking;

  constructor(private parkingService: ParkingService) { }

  ngOnInit() {
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

    return this.parkingService.updateParkingPlacements(coordinate, this.parkingPlacements);
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
    this.selectedSpot = _.find(this.parkingPlacements, spot => spot.x === coordinateX && spot.y === coordinateY);
  }

  public getSelectedArea(parking): void {
    const parkingFloor = parking.levels.find(floor => floor.name === this.parkingData.selectedFloor)
    const parkingArea = parkingFloor.areas.find(area => area.name === 'Area 1');
    this.terrainSizeRow = new Array(parkingArea.size_y);
    this.terrainSizeCol = new Array(parkingArea.size_x);
    this.parkingPlacements = parkingArea.spots;
  }
}
