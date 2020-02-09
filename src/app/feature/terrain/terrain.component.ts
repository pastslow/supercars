import { Component, OnInit } from '@angular/core';

import { ParkingLogicService } from 'src/app/shared/services/parking-logic.service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.scss']
})
export class TerrainComponent implements OnInit {
  public terrainSize = new Array(10);
  public parkingPlacements = [
    {
      x: 0,
      y: 2,
      orientation: 'vertical-cell'
    },
    {
      x: 1,
      y: 2,
      orientation: 'vertical-cell'
    },
    {
      x: 0,
      y: 3,
      orientation: 'vertical-cell'
    },
    {
      x: 1,
      y: 3,
      orientation: 'vertical-cell'
    },
    {
      x: 0,
      y: 4,
      orientation: 'vertical-cell'
    },
    {
      x: 1,
      y: 4,
      orientation: 'vertical-cell'
    },
    {
      x: 0,
      y: 5,
      orientation: 'vertical-cell'
    },
    {
      x: 1,
      y: 5,
      orientation: 'vertical-cell'
    },
    {
      x: 0,
      y: 6,
      orientation: 'vertical-cell'
    },
    {
      x: 1,
      y: 6,
      orientation: 'vertical-cell'
    },
    {
      x: 0,
      y: 7,
      orientation: 'vertical-cell'
    },
    {
      x: 1,
      y: 7,
      orientation: 'vertical-cell'
    },
    {
      x: 8,
      y: 2,
      orientation: 'vertical-cell'
    },
    {
      x: 9,
      y: 2,
      orientation: 'vertical-cell'
    },
    {
      x: 8,
      y: 3,
      orientation: 'vertical-cell'
    },
    {
      x: 9,
      y: 3,
      orientation: 'vertical-cell'
    },
    {
      x: 8,
      y: 4,
      orientation: 'vertical-cell'
    },
    {
      x: 9,
      y: 4,
      orientation: 'vertical-cell'
    },
    {
      x: 8,
      y: 5,
      orientation: 'vertical-cell'
    },
    {
      x: 9,
      y: 5,
      orientation: 'vertical-cell'
    },
    {
      x: 8,
      y: 6,
      orientation: 'vertical-cell'
    },
    {
      x: 9,
      y: 6,
      orientation: 'vertical-cell'
    },
    {
      x: 8,
      y: 7,
      orientation: 'vertical-cell'
    },
    {
      x: 9,
      y: 7,
      orientation: 'vertical-cell'
    },
    {
      x: 3,
      y: 0,
      orientation: 'horizontal-cell'
    },
    {
      x: 3,
      y: 1,
      orientation: 'horizontal-cell'
    },
    {
      x: 4,
      y: 0,
      orientation: 'horizontal-cell'
    },
    {
      x: 4,
      y: 1,
      orientation: 'horizontal-cell'
    },
    {
      x: 5,
      y: 0,
      orientation: 'horizontal-cell'
    },
    {
      x: 5,
      y: 1,
      orientation: 'horizontal-cell'
    },
    {
      x: 6,
      y: 0,
      orientation: 'horizontal-cell'
    },
    {
      x: 6,
      y: 1,
      orientation: 'horizontal-cell'
    },
    {
      x: 3,
      y: 8,
      orientation: 'horizontal-cell'
    },
    {
      x: 3,
      y: 9,
      orientation: 'horizontal-cell'
    },
    {
      x: 4,
      y: 8,
      orientation: 'horizontal-cell'
    },
    {
      x: 4,
      y: 9,
      orientation: 'horizontal-cell'
    },
    {
      x: 5,
      y: 8,
      orientation: 'horizontal-cell'
    },
    {
      x: 5,
      y: 9,
      orientation: 'horizontal-cell'
    },
    {
      x: 6,
      y: 8,
      orientation: 'horizontal-cell'
    },
    {
      x: 6,
      y: 9,
      orientation: 'horizontal-cell'
    },
  ];

  constructor(private parkingLogicService: ParkingLogicService) { }

  ngOnInit() {
  }

  public updateParkingPlacements(coordinateX: number, coordinateY: number) {
    const coordinate = {
      x: coordinateX,
      y: coordinateY
    };

    return this.parkingLogicService.updateParkingPlacements(coordinate, this.parkingPlacements);
  }

}
