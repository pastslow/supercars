import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

import { Spot } from '@app/shared/interfaces/spot.interface';
import { SharedConstants } from '@app/shared/constants/shared-constants';

import { ParkingLogicService } from '@app/shared/services/parking-logic.service';
import { ParkingSpot } from '@app/shared/interfaces/parking-spot.interface';
import { ParkingData } from '@app/shared/interfaces/parking-data.interface';

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

  constructor(private parkingLogicService: ParkingLogicService) { }

  ngOnInit() {
    this.parkingData = this.parkingLogicService.parkingData;

    if(this.parking) {
      this.getSelectedArea(this.parking);
    }
  }

  public updateParkingPlacements(coordinateY: number, coordinateX: number): Spot {
    const coordinate = {
      x: coordinateX,
      y: coordinateY
    };

    return this.parkingLogicService.updateParkingPlacements(coordinate, this.parkingPlacements);
  }

  public saveToSql(parkingPlacements) {
    let id = 5;
    let sql;
    for (const spot of parkingPlacements) {
      sql += `INSERT INTO \`parking_spots\`(\`id\`, \`spot_y\`, \`spot_x\`, \`orientation\`, \`line_position\`, \`active\`, \`indicator\`, \`parking_area_id\`) VALUES(\'${id}\', \'${spot.y}\', \'${spot.x}\', \'${spot.orientation}\', \'${spot.border}\', \'${spot.active ? 1 : 0}\', \'${spot.indicator}\', \'1\');`
      id++
    }
    // console.log(sql);

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

  public getSelectedArea(parking): void {
    const parkingFloor = parking.levels.find(floor => floor.name === this.parkingData.selectedFloor)
    const parkingArea = parkingFloor.areas.find(area => area.name === 'Area 1');
    this.terrainSizeRow = new Array(parkingArea.size_y);
    this.terrainSizeCol = new Array(parkingArea.size_x);
    this.parkingPlacements = parkingArea.spots;
  }
}
