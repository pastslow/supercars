import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ParkingLogicService {
  freeModeActive = false;
  shipRotation = false;

  constructor() { }

  rotateShip() {
    this.shipRotation = !this.shipRotation;
  }

  getRowNumber(placeMode: string, startingNumber: number, index: number) {
    return startingNumber + (placeMode === 'landscape' ? 0 : index);
  }

  getColumnNumber(placeMode: string, startingNumber: number, index: number) {
    return startingNumber + (placeMode === 'landscape' ? index : 0);
  }

  getSelectedShipPosition(placeMode: string, startingCol: number, startingRow: number, selectedShipSize: number) {
    return (placeMode === 'landscape' ? startingCol : startingRow) + (selectedShipSize - 1);
  }

  getSelectedCell(board: Element, rowNumber: number, columnNumber: number) {
    const selectedRow = board.children[rowNumber];
    const selectedCell = selectedRow.children[columnNumber];
    return selectedCell;
  }

  public updateParkingPlacements(coordinate, parkingPlacements) {
    return _.find(parkingPlacements, spot => spot.x === coordinate.x && spot.y === coordinate.y);
  }
}
