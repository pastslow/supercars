import { Directive, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appUpdateLineSize]',
})
export class UpdateLineSizeDirective implements AfterViewInit {
  @Input() private rowNumber: number;
  @Input() private colNumber: number;
  @Input() private terrain: Element;
  @Input() private parkingPlacements;

  constructor() {}

  public ngAfterViewInit(): void {
    this.updateLineSize(this.terrain, this.rowNumber, this.colNumber);
  }

  private updateLineSize(
    terrain: Element,
    rowNumber: number,
    colNumber: number
  ): void {
    const selectedSlot = this.parkingPlacements.find(
      (spot) => spot.x === colNumber && spot.y === rowNumber
    );

    const selectedRow = terrain.children[rowNumber];

    const selectedCell = selectedRow.children[colNumber];

    if (selectedSlot) {
      selectedCell.classList.add(selectedSlot.orientation);
      selectedCell.classList.add('placed');

      if (selectedSlot.border !== '') {
        selectedCell.children[0].classList.add(selectedSlot.border);
      }
    }
  }
}
