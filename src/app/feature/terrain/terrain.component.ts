import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { Spot } from 'src/app/shared/interfaces/spot.interface';
import { SharedConstants } from 'src/app/shared/constants/shared-constants';

import { ParkingLogicService } from 'src/app/shared/services/parking-logic.service';
import { ParkingSpot } from 'src/app/shared/interfaces/parking-spot.interface';
import { ParkingData } from 'src/app/shared/interfaces/parking-data.interface';

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

  constructor(private parkingLogicService: ParkingLogicService) { }

  ngOnInit() {
    this.parkingData = this.parkingLogicService.parkingData;

    this.terrainSizeRow = new Array(SharedConstants.parkingModels[this.parkingData.selectedFloor][this.parkingData.selectedArea].sizeRow);
    this.terrainSizeCol = new Array(SharedConstants.parkingModels[this.parkingData.selectedFloor][this.parkingData.selectedArea].sizeCol);

    this.parkingArea = SharedConstants.parkingModels[this.parkingData.selectedFloor][this.parkingData.selectedArea];
    this.parkingPlacements = this.parkingArea.spots;
  }

  public updateParkingPlacements(coordinateY: number, coordinateX: number): Spot {
    const coordinate = {
      x: coordinateX,
      y: coordinateY
    };

    return this.parkingLogicService.updateParkingPlacements(coordinate, this.parkingPlacements);
  }

  public changeModelNumber(operation: string): void {
    const numberOfModels = SharedConstants.parkingModels[this.parkingData.selectedFloor].length - 1;

    if (operation === 'add' && this.parkingData.selectedArea < numberOfModels) {
      this.parkingData.selectedArea++;
    } else if (operation === 'substract' && this.parkingData.selectedArea > 0) {
      this.parkingData.selectedArea--;
    }

    this.terrainSizeRow = new Array(0);
    this.terrainSizeCol = new Array(0);

    setTimeout(() => {
      this.parkingArea = SharedConstants.parkingModels[this.parkingData.selectedFloor][this.parkingData.selectedArea];
      this.parkingPlacements = this.parkingArea.spots;
      this.terrainSizeRow = new Array(this.parkingArea.sizeRow);
      this.terrainSizeCol = new Array(this.parkingArea.sizeCol);
    }, 0);
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
}
