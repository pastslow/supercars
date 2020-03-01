import { Directive, Input, AfterViewInit } from '@angular/core';

import * as _ from 'lodash';

@Directive({
  selector: '[appUpdateLineSize]'
})
export class UpdateLineSizeDirective implements AfterViewInit {
  @Input() private rowNumber: number;
  @Input() private colNumber: number;
  @Input() private terrain: Element;
  @Input() private parkingPlacements;

  constructor() { }

  ngAfterViewInit() {
    this.updateLineSize(this.terrain, this.rowNumber, this.colNumber);
  }

  private updateLineSize(terrain: Element, rowNumber: number, colNumber: number) {
    const selectedSlot = _.find(this.parkingPlacements, spot => spot.x === colNumber && spot.y === rowNumber);

    const selectedRow = terrain.children[rowNumber];

    const selectedCell = selectedRow.children[colNumber];

    if (selectedSlot) {
      selectedCell.classList.add(selectedSlot.orientation);

      if (selectedSlot.border !== '') {
        selectedCell.children[0].classList.add(selectedSlot.border);
      }
    }
  }
}
