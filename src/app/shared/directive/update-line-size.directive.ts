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
    const selectedSlot = _.find(this.parkingPlacements, spot => spot.x === rowNumber && spot.y === colNumber);

    const selectedRow = terrain.children[rowNumber];
    const previousRow = this.terrain.children[rowNumber - 1];

    const selectedCell = selectedRow.children[colNumber];
    const previousCell = selectedRow.children[colNumber - 1];

    if (selectedSlot) {
      selectedCell.classList.add(selectedSlot.orientation);

      if (previousCell && selectedSlot.orientation === 'vertical-cell') {
        this.adjutBorderSize(selectedCell, previousCell);
      } else if (previousRow && selectedSlot.orientation === 'horizontal-cell') {
        const siblingCell = previousRow.children[colNumber];

        if (siblingCell) {
          this.adjutBorderSize(selectedCell, siblingCell);
        }
      }

    }
  }

  private adjutBorderSize(selectedCell: Element, besideCell: Element) {
    const besideCellUsed = besideCell.classList.contains('vertical-line');
    const currentCellUsed = selectedCell.classList.contains('vertical-line');

    if (currentCellUsed && besideCellUsed) {
      besideCell.classList.add('small-border-right');
      selectedCell.classList.add('small-border-left');
    }
  }
}
