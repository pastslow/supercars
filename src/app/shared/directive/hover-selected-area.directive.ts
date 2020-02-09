import { Directive, HostListener, Input } from '@angular/core';
import { ParkingLogicService } from '../services/parking-logic.service';

@Directive({
  selector: '[appHoverSelectedArea]'
})
export class HoverSelectedAreaDirective {
  @Input() board: Element;
  @Input() row: number;
  @Input() col: number;
  @Input() selectedShipSize: number;

  constructor(private parkingLogicService: ParkingLogicService) { }

  @HostListener('mouseover') hoverSelectedArea() {
    if (this.parkingLogicService.freeModeActive) {
      this.updateHoverStatusForSelectedArea(this.parkingLogicService.shipRotation ? 'portrait' : 'landscape', 'add');
    }
  }

  @HostListener('mouseout') clearSelectedArea() {
    if (this.parkingLogicService.freeModeActive) {
      this.updateHoverStatusForSelectedArea(this.parkingLogicService.shipRotation ? 'portrait' : 'landscape', 'remove');
    }
  }

  /**
   * Add or remove hover based on parameters values.
   * @param placeMode Contains the view mode of the selected ship.
   * @param action Turns the method to remove or add the hover.
   */
  updateHoverStatusForSelectedArea(placeMode: string, action: string) {
    // Check if the selected ship position is available
    const selectedShipCanBePlaced = !!this.board.children[
      this.parkingLogicService.getSelectedShipPosition(placeMode, this.col, this.row, this.selectedShipSize)];

    if (selectedShipCanBePlaced) {
      for (let i = 0; i < this.selectedShipSize; i++) {
        const rowNumber = this.parkingLogicService.getRowNumber(placeMode, this.row, i);
        const columnNumber = this.parkingLogicService.getColumnNumber(placeMode, this.col, i);

        const selectedCell = this.parkingLogicService.getSelectedCell(this.board, rowNumber, columnNumber);

        if (action === 'add') {
          selectedCell.classList.add('hover-ship');
        } else {
          selectedCell.classList.remove('hover-ship');
        }
      }
    }
  }
}
